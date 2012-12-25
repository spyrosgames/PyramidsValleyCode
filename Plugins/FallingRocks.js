#pragma strict
var translationSpeedX:float=0;
var translationSpeedY:float=1;
var translationSpeedZ:float=0;

var local:boolean=true;

//public var explosionWithGroundVisualEffect : GameObject;
private var damageAmount : float = 5;

function Update () {


if (local==true){
transform.Translate(Vector3(translationSpeedX,translationSpeedY,translationSpeedZ)*Time.deltaTime);
}

if (local==false){
transform.Translate(Vector3(translationSpeedX,translationSpeedY,translationSpeedZ)*Time.deltaTime, Space.World);
}

}

/*
function OnTriggerEnter(other : Collider)
{
	if(other.transform.tag == "Ground")
	{
		Debug.Log("Rocks colliding with ground");
		Spawner.Spawn(explosionWithGroundVisualEffect, Vector3(transform.position.x, transform.position.y + 12, transform.position.z), Quaternion.identity);
	}
	
	if(other.transform.tag == "Enemy")
	{
		var targetHealth : Health = other.transform.GetComponent.<Health>();
		if (targetHealth && targetHealth.health > 0 && targetHealth.dead == false) {
			// Apply damage
			//targetHealth.OnDamage (damagePerSecond / frequency, -spawnPoint.forward);
			targetHealth.OnDamage (damageAmount, other.transform.forward);
		}
	}	
}
*/