package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Model.Role;
import org.springframework.stereotype.Service;

import java.util.List;


public interface RoleService {
    List<Role> getAllRoles();

    Role addRole(Role role);

    Role updateRole(Role role);

    void deleteRole(Long idRole);
}
