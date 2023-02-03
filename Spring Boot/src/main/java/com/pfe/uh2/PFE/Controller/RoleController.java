package com.pfe.uh2.PFE.Controller;

import com.pfe.uh2.PFE.Model.Role;
import com.pfe.uh2.PFE.Service.RoleServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/role")
public class RoleController {

    private RoleServiceImpl roleService ;

    public RoleController(RoleServiceImpl roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(this.roleService.getAllRoles() , HttpStatus.OK) ;
    }

    @PostMapping("/add")
    public ResponseEntity<Role> addRole(@RequestBody Role role){
        return new ResponseEntity<>(this.roleService.addRole(role) , HttpStatus.CREATED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<Role> updateRole(@RequestBody Role role){
        return new ResponseEntity<>(this.roleService.updateRole(role) , HttpStatus.OK );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable("id") Long idRole){
        this.roleService.deleteRole(idRole);
        return new ResponseEntity<>(HttpStatus.OK) ;
    }


}
