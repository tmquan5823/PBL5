package com.eko.eko.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        private final LogoutHandler logoutHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(req -> req.requestMatchers("/api/auth/**").permitAll()
                                                .requestMatchers("/api/user/**").hasAnyAuthority("USER", "ADMIN")
                                                .requestMatchers("/api/admin/**").hasAnyAuthority("ADMIN")
                                                .requestMatchers("/ws/**").permitAll()
                                                .requestMatchers("/api/push-notifications/**").permitAll()
                                                .requestMatchers("/api/notification/**")
                                                .hasAnyAuthority("USER", "ADMIN")
                                                .requestMatchers("/api/chat/**").permitAll()
                                                .anyRequest()
                                                .authenticated())
                                // .oauth2Login(Customizer.withDefaults())
                                // .sessionManagement(session -> session
                                // .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                                .logout(logout -> logout.logoutUrl("/api/auth/logout")
                                                .addLogoutHandler(logoutHandler)
                                                .logoutSuccessHandler(
                                                                (request, response,
                                                                                authentication) -> SecurityContextHolder
                                                                                                .clearContext()));
                return http.build();
        }
}
