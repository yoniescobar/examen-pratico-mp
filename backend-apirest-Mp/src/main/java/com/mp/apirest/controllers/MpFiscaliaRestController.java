package com.mp.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mp.apirest.dao.services.IMpFiscaliaService;
import com.mp.apirest.dao.services.MpFiscaliaServiceImpl;
import com.mp.apirest.models.entity.MpFiscalia;

@CrossOrigin(origins = {"http://localhost:3000"}) //accesso a datos React
@RestController
@RequestMapping("/api")
public class MpFiscaliaRestController {
	
	@Autowired
	private IMpFiscaliaService fiscaliaService;
	
	@GetMapping("/fiscalias")
	public List<MpFiscalia> index(){   //muestra list de fiscalias
		return fiscaliaService.findAll();
	}
	
	@GetMapping("/fiscalias/{id}")
	@ResponseStatus(HttpStatus.OK)
	public MpFiscalia show(@PathVariable Long id) {
		return fiscaliaService.findById(id);
	}
	
	@PostMapping("/fiscalias")
	@ResponseStatus(HttpStatus.CREATED)
	public MpFiscalia create(@RequestBody MpFiscalia fiscalia) {
		return fiscaliaService.save(fiscalia);
	}
	
	@PutMapping("/fiscalias/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public MpFiscalia update(@RequestBody MpFiscalia fiscalia,@PathVariable Long id) {
		MpFiscalia fiscaliaActual = fiscaliaService.findById(id);
		
		fiscaliaActual.setNombre(fiscalia.getNombre());
		fiscaliaActual.setMunicipio(fiscalia.getMunicipio());
		fiscaliaActual.setDireccion(fiscalia.getDireccion());
		fiscaliaActual.setTelefono(fiscalia.getTelefono());
		
		return fiscaliaService.save(fiscaliaActual);
		
	}
	@DeleteMapping("/fiscalias/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		fiscaliaService.delete(id);
	}
	
	
}
