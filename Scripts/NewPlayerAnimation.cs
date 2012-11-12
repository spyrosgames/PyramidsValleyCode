using UnityEngine;
using System.Collections;

public class NewPlayerAnimation : MonoBehaviour {
	public AnimationClip idle;
	public AnimationClip run;
	public AnimationClip magic;

	public AnimationClip forwardAim;
	public AnimationClip forwardAimRight;
	public AnimationClip forwardAimLeft;

	public AnimationClip backwardAim;
	public AnimationClip backwardAimRight;
	public AnimationClip backwardAimLeft;

	public AnimationClip idleShooting;

	private Transform tr;
	private Vector3 lastPosition = Vector3.zero;
	private Vector3 velocity = Vector3.zero;
	private Vector3 localVelocity = Vector3.zero;
	private float speed = 0;
	private float angle = 0;

	public Rigidbody rigid;

	void Awake()
	{
		tr = rigid.transform;
		lastPosition = tr.position;

		animation[idle.name].layer = 0;

		animation[run.name].layer = 1;
		animation[run.name].speed = 0.6f;

		animation[forwardAim.name].layer = 1;
		animation[forwardAim.name].weight = 1;
		animation[forwardAimRight.name].layer = 1;
		animation[forwardAimRight.name].weight = 1;
		animation[forwardAimLeft.name].layer = 1;
		animation[forwardAimLeft.name].weight = 1;

		animation[backwardAim.name].layer = 1;
		animation[backwardAim.name].weight = 1;
		animation[backwardAimRight.name].layer = 1;
		animation[backwardAimRight.name].weight = 1;
		animation[backwardAimLeft.name].layer = 1;
		animation[backwardAimLeft.name].weight = 1;

		animation.SyncLayer (1);
		
		animation[idle.name].layer = 2;
		animation[idleShooting.name].layer = 3;
		
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(speed > 0)
		{
			animation.CrossFade(run.name, 0.0f);
		}
		else
		{
			animation.CrossFade(idle.name, 0.1f);
		}
	}

	void FixedUpdate(){
		velocity = (tr.position - lastPosition) / Time.deltaTime;
		localVelocity = tr.InverseTransformDirection (velocity);
		localVelocity.y = 0;
		speed = localVelocity.magnitude;
		angle = HorizontalAngle (localVelocity);
		
		lastPosition = tr.position;
	}

	static float HorizontalAngle(Vector3 direction) {
		return Mathf.Atan2 (direction.x, direction.z) * Mathf.Rad2Deg;
}
}
