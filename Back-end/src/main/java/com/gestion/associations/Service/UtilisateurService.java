package com.gestion.associations.Service;

import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    public boolean login(String username, String password) {

        if ("soumaya".equals(username) && "1234".equals(password)) {
            return true;
        } else {
            return false;
        }
    }
}
