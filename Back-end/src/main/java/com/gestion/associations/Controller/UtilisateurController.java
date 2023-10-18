package com.gestion.associations.Controller;

import com.gestion.associations.Service.UtilisateurService;
import com.gestion.associations.Session.SessionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/utilisateur")
@CrossOrigin
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/login/{username}/{password}")
    public boolean login(@PathVariable("username") String username, @PathVariable("password") String password, HttpSession session) {
        boolean loggedIn = utilisateurService.login(username, password);

        if (loggedIn) {
            // Créez une nouvelle session et stockez les informations de session
            SessionInfo sessionInfo = new SessionInfo();
            sessionInfo.setLoggedIn(true);
            sessionInfo.setUsername(username);
            session.setAttribute("sessionInfo", sessionInfo);
        }

        return loggedIn;
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
    @GetMapping("/testSession")
    public SessionInfo testSession(HttpSession session) {
        // Récupérez les informations de session pour le test
        SessionInfo sessionInfo = (SessionInfo) session.getAttribute("sessionInfo");
        return sessionInfo;
    }
}
