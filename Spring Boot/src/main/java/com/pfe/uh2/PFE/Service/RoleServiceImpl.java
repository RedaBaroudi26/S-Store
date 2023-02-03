package com.pfe.uh2.PFE.Service;

import com.pfe.uh2.PFE.Exception.ApiRequestException;
import com.pfe.uh2.PFE.Model.Role;
import com.pfe.uh2.PFE.Repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRoles(){
        return this.roleRepository.findAll() ;
    }

    @Override
    public Role addRole(Role role){
        Role otherRole = this.roleRepository.findByRoleName(role.getRoleName());
        if(otherRole != null){
            throw new ApiRequestException("Role already exist") ;
        }
        return this.roleRepository.saveAndFlush(role) ;
    }

    @Override
    public Role updateRole(Role role){
        if(!this.roleRepository.findById(role.getIdRole()).isPresent()){
            throw new ApiRequestException("Role not found") ;
        }
        return this.roleRepository.saveAndFlush(role);
    }

    @Override
    public void deleteRole(Long idRole){
        if(!this.roleRepository.findById(idRole).isPresent()){
            throw new ApiRequestException("Role not found , this id doesn't exists ") ;
        }
        this.roleRepository.deleteById(idRole);
    }



}
