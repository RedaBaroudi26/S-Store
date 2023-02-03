package com.pfe.uh2.PFE.Controller;


import com.pfe.uh2.PFE.Model.User;
import com.pfe.uh2.PFE.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService  ;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(this.userService.getAllUsers() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        return new ResponseEntity<>(this.userService.addUser(user) , HttpStatus.CREATED) ;
    }


    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        return new ResponseEntity<>(this.userService.updateUser(user) , HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long idUser){
        this.userService.deleteUser(idUser);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }


    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email){
        return new ResponseEntity<>(this.userService.checkEmail(email) , HttpStatus.OK);
    }

    @GetMapping("/hasRole/{email}/{roleName}")
    public ResponseEntity<Boolean> hasRole(@PathVariable("email") String email , @PathVariable("roleName") String roleName){
        return new ResponseEntity<>(this.userService.hasRole(email , roleName) , HttpStatus.OK);
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<User> profile(@PathVariable("email") String email){
        return new ResponseEntity<>(this.userService.loadUserByEmail(email) , HttpStatus.OK) ;
    }

}
