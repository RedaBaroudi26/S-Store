package com.pfe.uh2.PFE.Config;


import com.pfe.uh2.PFE.Service.UserDetailsServiceImpl;
import com.pfe.uh2.PFE.filter.JWTAuthenticationFilter;
import com.pfe.uh2.PFE.filter.JWTAutorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserDetailsServiceImpl userDetailsService ;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable() ;
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) ;
        http.headers().frameOptions().disable();
        http.authorizeRequests().antMatchers( "/login" , "/home/refreshToken").permitAll();
        http.authorizeRequests().antMatchers(  HttpMethod.GET,"/api/category/**" , "/api/product/**" , "/api/user/checkEmail/**").permitAll();
        http.authorizeRequests().antMatchers(  HttpMethod.POST , "/api/user/**" ).permitAll();
        http.authorizeRequests().antMatchers("/api/commande/**" , "/api/account/commandes/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers(HttpMethod.PUT , "/api/user/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers(HttpMethod.GET , "/api/user/profile/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers(HttpMethod.PUT , "/api/user/**").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("**").hasAuthority("ADMIN");
        http.authorizeRequests().anyRequest().authenticated() ;
        http.addFilter(new JWTAuthenticationFilter(authenticationManager()));
        http.addFilterBefore(new JWTAutorizationFilter() , UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("http://localhost:4200", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }


    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
