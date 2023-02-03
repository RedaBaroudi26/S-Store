package com.pfe.uh2.PFE.Repository;

import com.pfe.uh2.PFE.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRoleName(String roleName);

}
