package com.mp.apirest.dao.services;

import java.util.List;
import com.mp.apirest.models.entity.MpFiscalia;

public interface IMpFiscaliaService {
	//contratos de metodo CRUD
	
	public List<MpFiscalia> findAll();
	
	public MpFiscalia findById(Long id);
	
	public MpFiscalia save(MpFiscalia fiscalia);
	
	public void delete(Long id);
	
	
}
