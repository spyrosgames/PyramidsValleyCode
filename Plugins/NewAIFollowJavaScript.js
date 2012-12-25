#pragma strict
private var player : Transform;
private var playerHealth : Health;
private var playerDirection : Vector3 ;

private var maxDistance : float;

//MeleeEnemyAnimations
public var meleeWalkAnimation : AnimationClip;
public var meleeIdleAnimation : AnimationClip;
public var meleeDeathAnimation : AnimationClip;

//RangedEnemyAnimations
public var rangedWalkAnimation : AnimationClip;
public var rangedIdleAnimation : AnimationClip;
public var rangedDeathAnimation : AnimationClip;

public var meleeMesh : GameObject;
public var rangedMesh : GameObject;

private var enemyInitialSpeed : float;

public var isDead : boolean = false;

private var navMeshAgent : NavMeshAgent;

private var hit : RaycastHit;

public var AIPoint1 : Transform;
public var AIPoint2 : Transform;

private var AIPoints : Transform[];
private var originalNavMeshRadius : float;

private var globals : Globals;

	
// Use this for initialization
function Awake()
{
	globals = Globals.GetInstance();
	
	player = GameObject.FindWithTag("Player").transform;
	playerHealth = player.GetComponent.<Health>();
	navMeshAgent = GetComponent.<NavMeshAgent>();
	enemyInitialSpeed = navMeshAgent.speed;
	AIPoints = [AIPoint1, AIPoint2];
	originalNavMeshRadius = navMeshAgent.radius;
	
	if(this.gameObject.name == "MeleeEnemy")
	{
		//maxDistance = 4.0;
		maxDistance = globals.meleeEnemyAIStoppingDistance;
		
	}
	if(this.gameObject.name == "RangedEnemy")
	{
		//maxDistance = 13.0;
		maxDistance = globals.rangedEnemyAIStoppingDistance;
	}
	if(this.gameObject.name == "Antagonist")
	{
		//maxDistance = 15.0;
		maxDistance = globals.antagonistAIStoppingDistance;
	}
	//navMeshAgent.stoppingDistance = maxDistance;
}

function Start () {

}

// Update is called once per frame
function Update () {

	if(playerHealth.dead == false && isDead == false)
	{
		if(globals.isEnemyStunned == false) //if enemy is not stunned
		{
			
			navMeshAgent.destination = player.position;
			//Debug.Log("I'm " + transform.name + " and remaining is = " + navMeshAgent.remainingDistance);
			//if(navMeshAgent.remainingDistance > 0)
			if(Vector3.Distance(player.position, transform.position) > maxDistance)
			{
				
				if(this.gameObject.name == "MeleeEnemy")
				{
					meleeMesh.animation.CrossFade(meleeWalkAnimation.name, 0.2);
					meleeMesh.animation[meleeWalkAnimation.name].speed = 1.6;
				}
				if(this.gameObject.name == "RangedEnemy")
				{
					rangedMesh.animation.CrossFade(rangedWalkAnimation.name, 0.1);
					rangedMesh.animation[rangedWalkAnimation.name].speed = 1;
				}
				
				
				if(Physics.Raycast(transform.position, transform.forward, hit))
				{
					//if an enemy is walking on the same line as another walking enemy, he will deviate a little by following one of the player AI points
					if(hit.transform.tag == "Enemy" && hit.distance < 18 && hit.transform.gameObject.GetComponent.<NavMeshAgent>().speed > 0)
					{
						if(navMeshAgent.radius < originalNavMeshRadius)
						{
							navMeshAgent.radius += 0.01;
						}
						navMeshAgent.autoRepath = true;
						navMeshAgent.destination = AIPoints[Random.Range(0, 2)].position;
						navMeshAgent.speed = enemyInitialSpeed;
						
						Debug.Log("Hey, I'm an enemy and I see another enemy in front of me. Do I behave right? and hit.distance is " + hit.distance);
					}
					//if enemies are around the player and another enemy is coming but the others are blocking him from entering, he will be idle
					else if(hit.transform.tag == "Enemy" && hit.distance < 4 && hit.transform.gameObject.GetComponent.<NavMeshAgent>().speed == 0)
					{
						if(navMeshAgent.radius > 0.5)
						{
							navMeshAgent.radius -= 0.01;
						}
						
						if(this.gameObject.name == "MeleeEnemy")
						{
							meleeMesh.animation.CrossFade(meleeIdleAnimation.name, 0.2);
						}
						if(this.gameObject.name == "RangedEnemy")
						{
							rangedMesh.animation.CrossFade(rangedIdleAnimation.name, 0.2);
						}
						Debug.Log("I'm " + transform.name + " and a " + hit.transform.name + " is standing in front of me");
					}
					else if(player.rigidbody.velocity == Vector3(0, 0, 0) && navMeshAgent.speed > 0 && Vector3.Distance(player.position, transform.position) > maxDistance && Vector3.Distance(player.position, transform.position) < maxDistance + 4)
					{
						//Debug.Log("I'm " + transform.name + " I see the player but I can't get to him");
						if(navMeshAgent.radius > 0.5)
						{
							navMeshAgent.radius -= 0.01;
						}
						
						Debug.Log("I'm very near to the player");
					}					
					else
					{
						if(navMeshAgent.radius < originalNavMeshRadius)
						{
							navMeshAgent.radius += 0.01;
						}
						navMeshAgent.destination = player.position;
						navMeshAgent.speed = enemyInitialSpeed;
						
					}
				}
				
				else
				{
					if(this.gameObject.name == "MeleeEnemy")
					{
						meleeMesh.animation.CrossFade(meleeIdleAnimation.name, 0.2);
					}
					if(this.gameObject.name == "RangedEnemy")
					{
						rangedMesh.animation.CrossFade(rangedIdleAnimation.name, 0.2);
					}
				}
				
			}
			else  //Enemy is attacking
			{
				if(this.gameObject.name == "MeleeEnemy")
				{
					transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
				}
				
				if(this.gameObject.name == "RangedEnemy")
				{
					transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
				}
				
				navMeshAgent.speed = 0;                                //DON'T REMOVE THIS	
				
				if(navMeshAgent.radius > 0.5)
				{
					navMeshAgent.radius -=0.01;
				}
				
			}	
			/*
			if(Vector3.Distance(player.position, transform.position) > maxDistance)
			{
				if(Physics.Raycast(transform.position, transform.forward, hit))
				{
				
					if(hit.transform.tag == "Enemy" && hit.distance < 4 && hit.rigidbody.velocity != Vector3(0, 0, 0))
					{
						if(navMeshAgent.radius < originalNavMeshRadius)
						{
							navMeshAgent.radius += 0.01;
						}
						navMeshAgent.autoRepath = true;
						navMeshAgent.destination = AIPoints[Random.Range(0, 2)].position;
	
						navMeshAgent.speed = enemyInitialSpeed;
						if(this.gameObject.name == "MeleeEnemy")
						{
							meleeMesh.animation.CrossFade(meleeWalkAnimation.name, 0.2);
							meleeMesh.animation[meleeWalkAnimation.name].speed = 1.6;
						}
						if(this.gameObject.name == "RangedEnemy")
						{
							rangedMesh.animation.CrossFade(rangedWalkAnimation.name, 0.1);
							rangedMesh.animation[rangedWalkAnimation.name].speed = 1;
						}
						Debug.Log("Hey, I'm an enemy and I see another enemy in front of me. Do I behave right? and hit.distance is " + hit.distance);
					}
					else if(hit.transform.tag == "Enemy" && hit.distance < 4 && hit.rigidbody.velocity == Vector3(0, 0, 0))
					{
						navMeshAgent.speed = 0;
						if(navMeshAgent.radius > 0.5)
						{
							navMeshAgent.radius -=0.01;
						}
						//navMeshAgent.radius = 0.5;
						if(this.gameObject.name == "MeleeEnemy")
						{
							meleeMesh.animation.CrossFade(meleeIdleAnimation.name, 0.2);
						}
						if(this.gameObject.name == "RangedEnemy")
						{
							rangedMesh.animation.CrossFade(rangedIdleAnimation.name, 0.2);
						}
					}
					else if(player.rigidbody.velocity == Vector3(0, 0, 0) && rigidbody.velocity == Vector3(0, 0, 0) && Vector3.Distance(player.position, transform.position) > maxDistance && Vector3.Distance(player.position, transform.position) < maxDistance + 4)
					{
						Debug.Log("I see the player but I can't get to him");
						if(navMeshAgent.radius > 0.5)
						{
							navMeshAgent.radius -=0.01;
						}
						//navMeshAgent.radius = 0.5;
					}
					else
					{
						if(navMeshAgent.radius < originalNavMeshRadius)
						{
							navMeshAgent.radius += 0.01;
						}
						navMeshAgent.destination = player.position;
						navMeshAgent.speed = enemyInitialSpeed;
						if(this.gameObject.name == "MeleeEnemy")
						{
							meleeMesh.animation.CrossFade(meleeWalkAnimation.name, 0.2);
							meleeMesh.animation[meleeWalkAnimation.name].speed = 1.6;
						}
						if(this.gameObject.name == "RangedEnemy")
						{
							rangedMesh.animation.CrossFade(rangedWalkAnimation.name, 0.1);
							rangedMesh.animation[rangedWalkAnimation.name].speed = 1;
						}
					}
				}
				else
				{
					if(navMeshAgent.radius < originalNavMeshRadius)
					{
						navMeshAgent.radius += 0.01;
					}
					navMeshAgent.destination = player.position;
					navMeshAgent.speed = enemyInitialSpeed;
					if(this.gameObject.name == "MeleeEnemy")
					{
						meleeMesh.animation.CrossFade(meleeWalkAnimation.name, 0.2);
						meleeMesh.animation[meleeWalkAnimation.name].speed = 1.6;
					}
					if(this.gameObject.name == "RangedEnemy")
					{
						rangedMesh.animation.CrossFade(rangedWalkAnimation.name, 0.1);
						rangedMesh.animation[rangedWalkAnimation.name].speed = 1;
					}
				}
				
			}
			else//if the enemy is at stopping distance
			{			
	
				//ATTACK
				if(this.gameObject.name == "MeleeEnemy")
				{
					transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
				}
				
				if(this.gameObject.name == "RangedEnemy")
				{
					transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
				}
				
				navMeshAgent.speed = 0;                                //DON'T REMOVE THIS	
				
				if(navMeshAgent.radius > 0.5)
				{
					navMeshAgent.radius -=0.01;
				}
	
			}
			*/
			
		}
		else   //if enemy is stunned
		{
			if(this.gameObject.name == "MeleeEnemy")
			{
				meleeMesh.animation.CrossFade(meleeIdleAnimation.name, 0.2);
			}
			if(this.gameObject.name == "RangedEnemy")
			{
				rangedMesh.animation.CrossFade(rangedIdleAnimation.name, 0.2);
			}
		}
	}
	else if(playerHealth.dead == true && isDead == false)
	{
		if(this.gameObject.name == "MeleeEnemy")
		{
			meleeMesh.animation.CrossFade(meleeIdleAnimation.name, 0.2);
		}
		if(this.gameObject.name == "RangedEnemy")
		{
			rangedMesh.animation.CrossFade(rangedIdleAnimation.name, 0.2);
		}
		navMeshAgent.speed = 0;
	}
	
}

function OnAnimationSignal()
{
	isDead = true;
	if(this.gameObject.name == "MeleeEnemy")
	{
		meleeMesh.animation.CrossFade(meleeDeathAnimation.name, 0.1, PlayMode.StopAll);
	}
	if(this.gameObject.name == "RangedEnemy")
	{
		rangedMesh.animation.CrossFade(rangedDeathAnimation.name, 0.1, PlayMode.StopAll);
		rangedMesh.animation[rangedDeathAnimation.name].speed = 0.6;
	}
	
	navMeshAgent.Stop(true);
}