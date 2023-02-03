package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByAccount_Email(String email) ;

}
