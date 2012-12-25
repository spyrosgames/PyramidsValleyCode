function OnParticleCollision(other : GameObject)
{
	//Debug.Log("Particles are killing enemies.");
	if(other.transform.tag == "Enemy")
	{
		var body : Rigidbody = other.rigidbody;
	
		if(body)
		{
			var direction : Vector3 = other.transform.position - transform.position;
			direction = direction.normalized;
			body.AddForce(direction * 5);
			var enemyHealth : Health = other.transform.GetComponent.<Health>();
			enemyHealth.OnDamage(100, -body.transform.forward);
		}
	}
}