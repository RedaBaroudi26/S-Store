package com.pfe.uh2.PFE.Service;


import com.pfe.uh2.PFE.Exception.ApiException;
import com.pfe.uh2.PFE.Exception.ApiRequestException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserServiceImpl userService ;

    public UserDetailsServiceImpl(UserServiceImpl userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.pfe.uh2.PFE.Model.User user = this.userService.loadUserByEmail(email);

        if(user == null){
            new ApiRequestException("Invalid User");
            return null ;
        }

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        user.getAccount().getRoles().forEach( r-> {
            authorities.add(new SimpleGrantedAuthority(r.getRoleName()));
        }) ;

        return new User(user.getAccount().getEmail() , user.getAccount().getPassword() , authorities);
    }

}
