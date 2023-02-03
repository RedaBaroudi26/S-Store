package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


public interface UserService {

    List<User> getAllUsers();

    User addUser(User user);

    User updateUser(User user);

    void deleteUser(Long idUser);

    Boolean checkEmail(String email);

    User loadUserByEmail(String email) ;

    boolean hasRole(String email , String roleName) ;



}
