#pragma strict

public var PlayerRedHealthbar : GUITexture;

private var healthObj : Health;
private var health : float;
private var maxHealth : float;

function Awake()
{
	healthObj = this.gameObject.GetComponent.<Health>();
	health = healthObj.health;
	maxHealth = healthObj.maxHealth;
}

function Start () {
	
}

function Update () {
	health = healthObj.health;
	maxHealth = healthObj.maxHealth;
	
	PlayerRedHealthbar.pixelInset.width = health / (maxHealth / 100);
}	

