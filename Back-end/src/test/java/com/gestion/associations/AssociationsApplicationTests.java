package com.gestion.associations;

import com.gestion.associations.Entity.Association;
import com.gestion.associations.Service.AssociationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class AssociationsApplicationTests {
	@Autowired
	private AssociationService associationService;

	@Test
	void contextLoads() {
	}

	@Test
	public void createList() {


	}
}