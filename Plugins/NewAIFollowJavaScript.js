
	private var player : Transform;
	private var playerHealth : float;
	private var playerDirection : Vector3 ;
	private var pyramidDirection : Vector3 ;
	private var walkingSpeed : float = 4.0;
	private var maxDistance : float = 4.0;

	public var walkAnimation : AnimationClip ;
	public var idleAnimation : AnimationClip ;
	public var deathAnimation : AnimationClip ;

	public var enemyBody : GameObject;
	private var enemyInitialSpeed : float;
	public var isDead : boolean = false;
	private var navMeshAgent : NavMeshAgent;
	private var randomDistanceFromPlayer : Vector3;

	private var hit : RaycastHit;

	public var AIPoint1 : Transform;
	public var AIPoint2 : Transform;

	private var AIPoints : Transform[];
	private var originalNavMeshRadius : float;

	// Use this for initialization
	function Awake()
	{
		player = GameObject.FindWithTag("Player").transform;
		playerHealth = player.GetComponent.<Health>().health;
		navMeshAgent = GetComponent.<NavMeshAgent>();
		enemyInitialSpeed = navMeshAgent.speed;
		AIPoints = [AIPoint1, AIPoint2];
		originalNavMeshRadius = navMeshAgent.radius;
	}

	function Start () {

	}

	// Update is called once per frame
	function Update () {

		if(playerHealth > 0 && isDead == false)
		{
			//GetComponent<NavMeshAgent>().destination = player.position;
			//transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
			
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
						enemyBody.animation.CrossFade(walkAnimation.name, 0.2);
						enemyBody.animation[walkAnimation.name].speed = 1.6;

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
						enemyBody.animation.CrossFade(idleAnimation.name, 0.2);
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
						enemyBody.animation.CrossFade(walkAnimation.name, 0.2);
						enemyBody.animation[walkAnimation.name].speed = 1.6;
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
					enemyBody.animation.CrossFade(walkAnimation.name, 0.2);
					enemyBody.animation[walkAnimation.name].speed = 1.6;
				}
				
				//GetComponent.<NavMeshAgent>().destination = player.position;
				//GetComponent.<NavMeshAgent>().destination = playerPartToFollow.position;
			}
			else
			{
				//ATTACK
				transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
				//GetComponent<NavMeshAgent>().destination = player.position;
				navMeshAgent.speed = 0;                                //DON'T REMOVE THIS
				if(navMeshAgent.radius > 0.5)
				{
					navMeshAgent.radius -=0.01;
				}
				//navMeshAgent.radius = 0.5;
				
				//enemyBody.animation.CrossFadeQueued(idleAnimation.name, 0, QueueMode.CompleteOthers);
				if(this.gameObject.name == "RangedEnemy")
				{
					enemyBody.animation.CrossFade(idleAnimation.name, 0.2);
				}
				

			}
		}
}

function OnAnimationSignal()
{
	isDead = true;
	enemyBody.animation.CrossFade(deathAnimation.name, 0.1, PlayMode.StopAll);
	navMeshAgent.Stop(true);
}