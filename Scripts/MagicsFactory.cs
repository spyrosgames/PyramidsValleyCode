using UnityEngine;
using System.Collections;
using System.Reflection;

class MagicsFactory : MonoBehaviour {
	private Hashtable magicsTable = new Hashtable();
	private Hashtable magicsCoolDownTable = new Hashtable();
	private Hashtable inGameMagicsTable = new Hashtable();
	//to be removed
	//public GUIText debugGUIText;
	private GameObject[] enemies;
	private GameObject player;
	private Health playerHealth;
	private AutoFire autoFire;
	private FreeMovementMotor freeMovementMotor;
	private float originalDamagePerSecond;
	private float originalWalkingSpeed;
	public AnimationClip meleeIdleAnimation;
	public AnimationClip rangedIdleAnimation;
	public AnimationClip meleeMoveForwardAnimation;
	public AnimationClip rangedMoveForwardAnimation;

	public GameObject StunMagicVisualEffect;
	public GameObject LightningStrikeMagicVisualEffect;
	public GameObject TornadoMagicVisualEffect;
	public GameObject CrowstormMagicVisualEffect;
	public GameObject DustStormMagicVisualEffect;
	public GameObject FireMagicVisualEffect;
	public GameObject HolyFireMagicVisualEffect;
	public GameObject ElectricityMagicVisualEffect;
	public GameObject StarfallMagicVisualEffect;
	public GameObject ShakeMagicVisualEffect;
	public GameObject FallenRocksVisualEffect;
	public GameObject WhirlMagicVisualEffect;
	public GameObject FingerStunMagicVisualEffect;
	public GameObject StaticChargeMagicVisualEffect;
	public GameObject MagmaMagicVisualEffect;
	public GameObject IceFallMagicVisualEffect;
	public GameObject IceStunMagicVisualEffect;
	public GameObject IceExplosionVisualEffect;
	public GameObject LightningBallMagicVisualEffect;
	public GameObject LightningBoltMagicVisualEffect;
	public GameObject BerserkMagicVisualEffect;
	
	public AudioClip ShakeMagicSound;

	public GameObject TornadoCheckpoint1;

	public GameObject MainCamera;

	public GameObject MainCameraParentObject;

	public GameObject SlaveGO;
	
	private Globals globals;
	
	public MagicsFactory()
	{

	}

	public void addMagicToTable(string name, int iconID, float coolDownTime)
	{
		magicsTable.Add(name, iconID);
		magicsCoolDownTable.Add(name, coolDownTime);
	}
	
	
	public int getIcon(string name)
	{
		int iconID = (int)magicsTable[name];
		return iconID;
	}

	public float getCoolDownTime(string name)
	{
		float coolDownTime = (float)magicsCoolDownTable[name];
		return coolDownTime;
	}
	
	public bool checkForMagicInTable(string name)
	{
		return magicsTable.Contains(name);
	}

	public void getMagicEffect(string name)
	{		
		string magicFullName = name + "MagicEffect";
		
		Debug.Log("Calling Magic " + magicFullName);
		SendMessage(magicFullName);
		/*
		//Using reflection
		MethodInfo addMethod = this.GetType().GetMethod(magicFullName);
		addMethod.Invoke(this, new object[] {});
		*/
	}
	public void disableMagicEffect(string name, float coolDownTime)
	{
		string disableMagicFunctionFullName = "Disable" + name + "MagicEffect";
		Invoke(disableMagicFunctionFullName, coolDownTime);
	}

	public void addFirstMagic(string name)
	{
		inGameMagicsTable.Add(1, name);
	}

	public void addSecondMagic(string name)
	{
		inGameMagicsTable.Add(2, name);
	}

	public void addThirdMagic(string name)
	{
		inGameMagicsTable.Add(3, name);
	}

	public void addFourthMagic(string name)
	{
		inGameMagicsTable.Add(4, name);
	}

	public string getInGameMagic(int magicNumber)
	{
		return (string)inGameMagicsTable[magicNumber];
	}

	private IEnumerator LightningStrikeMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		//player = GameObject.FindWithTag("Player");
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
						Health enemyHealth = enemies[i].transform.GetComponent<Health>();
						GameObject destructionEffect = Instantiate(LightningStrikeMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
						destructionEffect.transform.parent = enemies[i].gameObject.transform;
						if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
						{
							enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
						}
						yield return new WaitForSeconds(0.5f);

					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
		}

	}

	private IEnumerator HolyFireMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//f(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject holyFireObj = Instantiate(HolyFireMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					holyFireObj.transform.parent = enemies[i].gameObject.transform;
					
					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);
					}
					
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
		}	
	}

	private IEnumerator StunMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		globals.isEnemyStunned = true;
		for(int i = 0; i < enemies.Length; i++)
		{
			enemies[i].GetComponent<NavMeshAgent>().Stop(true);

			GameObject stunEffect = Instantiate(StunMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 2, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
			//stunEffect.transform.parent = enemies[i].gameObject.transform;
		}
		yield return new WaitForSeconds(7.0f);
		globals.isEnemyStunned = false;
		for(int i = 0; i < enemies.Length; i++)
		{
			enemies[i].GetComponent<NavMeshAgent>().Resume();
		}

		
	}

	
	private IEnumerator FingerStunMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		globals.isEnemyStunned = true;
		for(int i = 0; i < enemies.Length; i++)
		{
			enemies[i].GetComponent<NavMeshAgent>().Stop(true);
			GameObject fingerStunEffect = Instantiate(FingerStunMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 5, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
			//fingerStunEffect.transform.parent = enemies[i].gameObject.transform;
			
			Health enemyHealth = enemies[i].transform.GetComponent<Health>();
			if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
			{
				enemyHealth.OnDamage(2, -enemies[i].transform.forward);	
			}
		}
		
		yield return new WaitForSeconds(5.0f);
		globals.isEnemyStunned = false;
		for(int i = 0; i < enemies.Length; i++)
		{
			enemies[i].GetComponent<NavMeshAgent>().Resume();
		}
		
		
	}
	
	private IEnumerator IceStunMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		globals.isEnemyStunned = true;
		for(int i = 0; i < enemies.Length; i++)
		{
			enemies[i].GetComponent<NavMeshAgent>().Stop(true);

			GameObject iceStunEffect = Instantiate(IceStunMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
			//stunEffect.transform.parent = enemies[i].gameObject.transform;
		}
		yield return new WaitForSeconds(7.0f);
		globals.isEnemyStunned = false;
		
		for(int i = 0; i < enemies.Length; i++)
		{
			GameObject iceStunExplosion = Instantiate(IceExplosionVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 4, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
			enemies[i].GetComponent<NavMeshAgent>().Resume();
		}
	}
	
	private IEnumerator LightningBallMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		float playerRotation = player.transform.eulerAngles.y;
		Debug.Log(playerRotation);
		GameObject lightningBall = Instantiate(LightningBallMagicVisualEffect, new Vector3(TornadoCheckpoint1.transform.position.x, player.transform.position.y, TornadoCheckpoint1.transform.position.z), Quaternion.Euler(new Vector3(0, playerRotation, 0))) as GameObject;
	
	}
	
	private void FrenzyMagicEffect()
	{
		//debugGUIText.text = "Frenzy";
		player = GameObject.FindWithTag("Player");
		autoFire = player.GetComponentInChildren<AutoFire>();
		originalDamagePerSecond = autoFire.damagePerSecond;
		autoFire.damagePerSecond *= 2;
		//Invoke("DisableFrenzyMagicEffect", 4f);
	}

	private void DisableFrenzyMagicEffect()
	{
		player = GameObject.FindWithTag("Player");
		autoFire = player.GetComponentInChildren<AutoFire>();
		autoFire.damagePerSecond = originalDamagePerSecond;
	}

	private void HealMagicEffect()
	{
		//debugGUIText.text = "Heal";
		player = GameObject.FindWithTag("Player");
		playerHealth = player.GetComponent<Health>();
		playerHealth.health = playerHealth.maxHealth;
	}
	private void TeleportMagicEffect()
	{
		//debugGUIText.text = "Teleport";
	}

	private void HasteMagicEffect()
	{
		//debugGUIText.text = "Haste";
		player = GameObject.FindWithTag("Player");
		freeMovementMotor = player.GetComponent<FreeMovementMotor>();
		originalWalkingSpeed = freeMovementMotor.walkingSpeed;
		freeMovementMotor.walkingSpeed *= 2;

		//Invoke("DisableHasteMagicEffect", 4f); //cool down times should be got from the user choice
	}

	private void DisableHasteMagicEffect()
	{
		player = GameObject.FindWithTag("Player");
		freeMovementMotor = player.GetComponent<FreeMovementMotor>();
		freeMovementMotor.walkingSpeed = originalWalkingSpeed;
	}

	private IEnumerator TornadoMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		GameObject tornadoObj = Instantiate(TornadoMagicVisualEffect, new Vector3(player.transform.position.x, player.transform.position.y + 1, player.transform.position.z), Quaternion.identity) as GameObject;
		
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-5, 0, 6);
		Vector3 thirdPoint = secondPoint + new Vector3(20, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-30, 0, -6);

		Vector3[] path = new Vector3[4];
		path[0] = firstPoint;
		path[1] = secondPoint;
		path[2] = thirdPoint;
		path[3] = fourthPoint;
		/*
		Hashtable ht = new Hashtable();
		ht.Add("x", player.transform.localPosition.x);
		ht.Add("time", 30);
		ht.Add("path", path);
		*/
		iTween.MoveTo(tornadoObj, iTween.Hash("x", 0, "time", 30, "path", path));
	}

	private IEnumerator CrowstormMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		GameObject crowstormObj = Instantiate(CrowstormMagicVisualEffect, new Vector3(player.transform.position.x, player.transform.position.y + 1, player.transform.position.z), Quaternion.identity) as GameObject;
		crowstormObj.name = "CrowstormGO";
		crowstormObj.transform.parent = player.transform;
		
		Transform[] crowstormobjects;
		crowstormobjects = crowstormObj.GetComponentsInChildren<Transform>();
		
		foreach(Transform crowstormobj in crowstormobjects)
		{
			if(crowstormobj != null)
			{
				if(crowstormobj.name == "CrowStorm_Main")
				{
					crowstormobj.transform.parent = player.transform.parent;
					yield return new WaitForSeconds(5.6f);
					crowstormobj.transform.parent = crowstormObj.transform;
				}
			}
		}
		
	}

	private IEnumerator DustStormMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject dustStormObj = Instantiate(DustStormMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					dustStormObj.transform.parent = enemies[i].gameObject.transform;
					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
					}
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
		}
	}
	
	private IEnumerator MagmaMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject magmaObj = Instantiate(MagmaMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					magmaObj.transform.parent = enemies[i].gameObject.transform;
					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
					}
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
		}
	}
	
	private IEnumerator FireMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-7, 0, 6);
		Vector3 thirdPoint = secondPoint + new Vector3(14, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-11, 0, -3);
		Vector3 fifthPoint = fourthPoint + new Vector3(5, 0, 6);
		Vector3 sixthPoint = fifthPoint + new Vector3(2, 0, -6);

		Vector3[] firePoints = new Vector3[6];
		firePoints[0] = firstPoint;
		firePoints[1] = secondPoint;
		firePoints[2] = thirdPoint;
		firePoints[3] = fourthPoint;
		firePoints[4] = fifthPoint;
		firePoints[5] = sixthPoint;

		for(int i = 0; i < firePoints.Length; i++)
		{
			GameObject fireObj = Instantiate(FireMagicVisualEffect, firePoints[i], Quaternion.identity) as GameObject;
			fireObj.transform.parent = player.transform;
			yield return new WaitForSeconds(0.4f);
		}
	}

	private IEnumerator ElectricityMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-7, 0, 6);
		Vector3 thirdPoint = secondPoint + new Vector3(14, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-11, 0, -3);
		Vector3 fifthPoint = fourthPoint + new Vector3(5, 0, 6);
		Vector3 sixthPoint = fifthPoint + new Vector3(2, 0, -6);

		Vector3[] electricityPoints = new Vector3[6];
		electricityPoints[0] = firstPoint;
		electricityPoints[1] = secondPoint;
		electricityPoints[2] = thirdPoint;
		electricityPoints[3] = fourthPoint;
		electricityPoints[4] = fifthPoint;
		electricityPoints[5] = sixthPoint;

		for(int i = 0; i < electricityPoints.Length; i++)
		{
			GameObject electricityObj = Instantiate(ElectricityMagicVisualEffect, electricityPoints[i], Quaternion.identity) as GameObject;
			electricityObj.transform.parent = player.transform;
			yield return new WaitForSeconds(0.4f);
		}
	}
	
	private IEnumerator StaticChargeMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-7, 0, 6);
		Vector3 thirdPoint = secondPoint + new Vector3(14, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-11, 0, -3);
		Vector3 fifthPoint = fourthPoint + new Vector3(5, 0, 6);
		Vector3 sixthPoint = fifthPoint + new Vector3(2, 0, -6);

		Vector3[] staticChargePoints = new Vector3[6];
		staticChargePoints[0] = firstPoint;
		staticChargePoints[1] = secondPoint;
		staticChargePoints[2] = thirdPoint;
		staticChargePoints[3] = fourthPoint;
		staticChargePoints[4] = fifthPoint;
		staticChargePoints[5] = sixthPoint;

		for(int i = 0; i < staticChargePoints.Length; i++)
		{
			GameObject staticChargeObj = Instantiate(StaticChargeMagicVisualEffect, staticChargePoints[i], Quaternion.identity) as GameObject;
			staticChargeObj.transform.parent = player.transform;
			yield return new WaitForSeconds(0.4f);
		}
	}
	
	private IEnumerator StarfallMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");

		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject starfallObj = Instantiate(StarfallMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					starfallObj.transform.parent = enemies[i].gameObject.transform;
					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
					}
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
			yield return new WaitForSeconds(0.25f);
		}
	}
	
	private IEnumerator LightningBoltMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		enemies = GameObject.FindGameObjectsWithTag("Enemy");

		//for(int i = 0; i < (int)Random.Range(enemies.Length * 0.5f, enemies.Length); i++)
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject lightningBoltObj = Instantiate(LightningBoltMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 25, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					
					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
					}
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
			yield return new WaitForSeconds(0.25f);
		}
	}
	
	
	private void ScrubsMagicEffect()
	{

	}

	private IEnumerator ShakeMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		iTween.ShakePosition(MainCameraParentObject, new Vector3(1, 1, 1), 5.0f);
		Handheld.Vibrate ();
		audio.PlayOneShot(ShakeMagicSound);
		player = GameObject.FindWithTag("Player");

		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		
		for(int j = 0; j < 20; j++)
		{
			GameObject fallenRocksObj = Instantiate(FallenRocksVisualEffect, new Vector3(player.transform.position.x + Random.Range(-50, 50), player.transform.position.y + Random.Range(0, 25), player.transform.position.z + Random.Range(-50, 50)), Quaternion.Euler(0, 0, -90)) as GameObject;
			fallenRocksObj.GetComponent<FallingRocks>().translationSpeedX = Random.Range(7, 10);
		}
		
		for(int j = 0; j < 20; j++)
		{
			GameObject fallenRocksObj = Instantiate(FallenRocksVisualEffect, new Vector3(player.transform.position.x + Random.Range(-50, 50), player.transform.position.y + Random.Range(26, 50), player.transform.position.z + Random.Range(-50, 50)), Quaternion.Euler(0, 0, -90)) as GameObject;
			fallenRocksObj.GetComponent<FallingRocks>().translationSpeedX = Random.Range(7, 10);
		}
		
		for(int i = 0; i < enemies.Length; i++)
		{
			//if(MainCamera != null)
			//{
				//Vector3 enemyPositionInsideScreen = MainCamera.camera.WorldToScreenPoint(enemies[i].transform.position);
				//if(enemyPositionInsideScreen.x > 0 && enemyPositionInsideScreen.x < Screen.width && enemyPositionInsideScreen.y > 0 && enemyPositionInsideScreen.y < Screen.height)
				//{
					Health enemyHealth = enemies[i].transform.GetComponent<Health>();
					GameObject starfallObj = Instantiate(ShakeMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity) as GameObject;
					
					//starfallObj.transform.parent = enemies[i].gameObject.transform;

					if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
					{
						enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
					}
					//enemyHealth.dieSignals.SendSignals(enemyHealth);
				//}
			//}
			yield return new WaitForSeconds(0.4f);
		}
	}
	
	private IEnumerator SlaveMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");

		SlaveGO.SetActiveRecursively(true);
		SlaveGO.GetComponent<AddTimerUnitHUD>().enabled = true;
		SlaveGO.transform.position = new Vector3(player.transform.position.x + 4, player.transform.position.y, player.transform.position.z + 4);
		SlaveGO.transform.rotation = player.transform.rotation;
	}
	
	private IEnumerator WhirlMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-7, 0, 12);
		Vector3 thirdPoint = secondPoint + new Vector3(17, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-23, 0, -9);
		Vector3 fifthPoint = fourthPoint + new Vector3(15, 0, 12);
		Vector3 sixthPoint = fifthPoint + new Vector3(12, 0, -12);

		Vector3[] whirlPoints = new Vector3[6];
		whirlPoints[0] = firstPoint;
		whirlPoints[1] = secondPoint;
		whirlPoints[2] = thirdPoint;
		whirlPoints[3] = fourthPoint;
		whirlPoints[4] = fifthPoint;
		whirlPoints[5] = sixthPoint;

		for(int i = 0; i < whirlPoints.Length; i++)
		{
			GameObject whirlObj = Instantiate(WhirlMagicVisualEffect, whirlPoints[i], Quaternion.identity) as GameObject;
			//whirlObj.transform.parent = player.transform;
			yield return new WaitForSeconds(0.4f);
		}
	}
	
	private IEnumerator IceFallMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		//player = GameObject.FindWithTag("Player");
		Vector3 firstPoint = TornadoCheckpoint1.transform.position;
		Vector3 secondPoint = firstPoint + new Vector3(-7, 0, 12);
		Vector3 thirdPoint = secondPoint + new Vector3(17, 0, 0);
		Vector3 fourthPoint = thirdPoint + new Vector3(-23, 0, -9);
		Vector3 fifthPoint = fourthPoint + new Vector3(15, 0, 12);
		Vector3 sixthPoint = fifthPoint + new Vector3(12, 0, -12);

		Vector3[] IceFallPoints = new Vector3[6];
		IceFallPoints[0] = firstPoint;
		IceFallPoints[1] = secondPoint;
		IceFallPoints[2] = thirdPoint;
		IceFallPoints[3] = fourthPoint;
		IceFallPoints[4] = fifthPoint;
		IceFallPoints[5] = sixthPoint;

		for(int i = 0; i < IceFallPoints.Length; i++)
		{
			GameObject iceFallObj = Instantiate(IceFallMagicVisualEffect, IceFallPoints[i] + new Vector3(0, 33, 0), Quaternion.identity) as GameObject;
			//iceFallObj.transform.parent = player.transform;
			yield return new WaitForSeconds(0.4f);
		}
	}
	
	private IEnumerator BerserkMagicEffect()
	{
		yield return new WaitForSeconds(0.8f);
		player = GameObject.FindWithTag("Player");
		GameObject berserkObj = Instantiate(BerserkMagicVisualEffect, new Vector3(player.transform.position.x, player.transform.position.y + 2, player.transform.position.z), Quaternion.identity) as GameObject;
		berserkObj.transform.parent = player.transform;
	}
	
	void Awake()
	{
		globals = Globals.GetInstance();
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
