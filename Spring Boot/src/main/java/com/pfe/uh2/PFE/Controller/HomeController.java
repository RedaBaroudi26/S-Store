package com.pfe.uh2.PFE.Controller;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfe.uh2.PFE.Model.User;
import com.pfe.uh2.PFE.Service.UserService;
import com.pfe.uh2.PFE.share.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/home")
public class HomeController {

    private UserService userService ;

    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<?> home(){
       return new ResponseEntity<>("{'version':'1.0.0'}" , HttpStatus.OK) ;
    }

    @GetMapping("/refreshToken")
    public void refreshToken(HttpServletRequest request , HttpServletResponse response )throws Exception{

        String authToken = request.getHeader(JWTUtil.AUT_HEADER) ;

        if(authToken != null && authToken.startsWith(JWTUtil.PREFIX)){

            try {

                String refreshToken = authToken.substring(JWTUtil.PREFIX.length());
                Algorithm algorithm = Algorithm.HMAC256(JWTUtil.SECRET);
                JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken);
                String email = decodedJWT.getSubject();
                User user = this.userService.loadUserByEmail(email);

                String accessToken = JWT.create()
                        .withSubject(user.getAccount().getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + JWTUtil.EXPIRE_ACCESS_TOKEN))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles",user.getAccount().getRoles().stream().map(r -> r.getRoleName()).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> idToken = new HashMap<>();
                idToken.put("accessToken" , accessToken) ;
                idToken.put("refreshToken" , refreshToken) ;

                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream() , idToken);


            }catch (Exception e){

                throw  e ;

            }

        }else{
            throw  new RuntimeException("Refresh Token required !!!") ;
        }

    }



}
