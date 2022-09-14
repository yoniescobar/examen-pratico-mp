package com.mp.apirest.dao.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mp.apirest.models.dao.IMpFiscaliaDao;
import com.mp.apirest.models.entity.MpFiscalia;

@Service
public class MpFiscaliaServiceImpl implements IMpFiscaliaService {

	//Implematamos las interfaces IMunicipioService
	@Autowired
	private IMpFiscaliaDao mpfiscaliaDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<MpFiscalia> findAll() {
		
		return (List<MpFiscalia>) mpfiscaliaDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public MpFiscalia findById(Long id) {
		return mpfiscaliaDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public MpFiscalia save(MpFiscalia fiscalia) {
		return mpfiscaliaDao.save(fiscalia);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		mpfiscaliaDao.deleteById(id);
	}

}
