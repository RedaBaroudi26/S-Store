package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Role;
import com.pfe.uh2.PFE.Model.User;
import com.pfe.uh2.PFE.Repository.AccountRepository;
import com.pfe.uh2.PFE.Repository.RoleRepository;
import com.pfe.uh2.PFE.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService{

    private UserRepository userRepository ;
    private AccountRepository accountRepository;
    private RoleRepository roleRepository ;
    private PasswordEncoder passwordEncoder ;

    public UserServiceImpl(UserRepository userRepository, AccountRepository accountRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers(){
        return this.userRepository.findAll() ;
    }

    @Override
    public User addUser(User user){
        User otherUser = this.userRepository.findUserByAccount_Email(user.getAccount().getEmail()) ;
        if(otherUser != null){
              throw new ApiRequestException("email already taken") ;
        }
        String pw = user.getAccount().getPassword();
        user.getAccount().setPassword(passwordEncoder.encode(pw));
        return this.userRepository.saveAndFlush(user) ;
    }

    @Override
    public User updateUser(User user){
        if(!this.userRepository.findById(user.getIdUser()).isPresent()){
            throw new ApiRequestException("user not found");
        }
        String pw = user.getAccount().getPassword();
        user.getAccount().setPassword(passwordEncoder.encode(pw));
        return this.userRepository.saveAndFlush(user);
    }

    @Override
    public void deleteUser(Long idUser){
        if(!this.userRepository.findById(idUser).isPresent()){
            throw new ApiRequestException("user not found");
        }
        this.userRepository.deleteById(idUser);
    }

    @Override
    public Boolean checkEmail(String email){
        return this.accountRepository.existsAccountByEmail(email) ;
    }

    @Override
    public User loadUserByEmail(String email) {
        return this.userRepository.findUserByAccount_Email(email) ;
    }

    @Override
    public boolean hasRole(String email, String roleName) {

        User user = this.userRepository.findUserByAccount_Email(email);
        Role role = this.roleRepository.findByRoleName(roleName) ;

        if(user == null){
            throw new ApiRequestException("User not found");
        }

        if(role == null){
            throw new ApiRequestException("Role not found");
        }

        return  user.getAccount().getRoles().contains(role);
    }


}
