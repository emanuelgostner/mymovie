package com.mymovie.dto;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
	// Primary-Key
	@Id
	// Primary-Key is automatically generated
	// IDENTITY ( unique per database table); AUTO (unique accross whole database)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// Column Value is created by Enumerator. Annotations necessary for enum <-> db conversion
	// length (the maximum length of data stored in this column)
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;

	// If no Column annotation defined. The default values of column are aut. used
	public Role() {

	}

	public Role(ERole name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}
}