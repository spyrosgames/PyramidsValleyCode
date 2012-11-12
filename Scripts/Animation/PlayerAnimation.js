#pragma strict

class MoveAnimation {
	// The animation clip
	var clip : AnimationClip;
	
	// The velocity of the walk or run cycle in this clip
	var velocity : Vector3;
	
	// Store the current weight of this animation
	@HideInInspector
	public var weight : float;
	
	// Keep track of whether this animation is currently the best match
	@HideInInspector
	public var currentBest : boolean = false;
	
	// The speed and angle is directly derived from the velocity,
	// but since it's slightly expensive to calculate them
	// we do it once in the beginning instead of in every frame.
	@HideInInspector
	public var speed : float;
	@HideInInspector
	public var angle : float;
	
	public function Init () {
		velocity.y = 0;
		speed = velocity.magnitude;
		angle = PlayerAnimation.HorizontalAngle (velocity);
	}
}

var rigid : Rigidbody;
var rootBone : Transform;
var upperBodyBone : Transform;
var maxIdleSpeed : float = 0.5;
var minWalkSpeed : float = 2.0;
var idle : AnimationClip;
var turn : AnimationClip;
var shootAdditive : AnimationClip;
var forwardAim : AnimationClip;
var forwardAimRight : AnimationClip;
var forwardAimLeft : AnimationClip;
var backwardAim : AnimationClip;
var backwardAimRight : AnimationClip;
var backwardAimLeft : AnimationClip;
var magic : AnimationClip;
var run : AnimationClip;
var death : AnimationClip;

var moveAnimations : MoveAnimation[];
var footstepSignals : SignalSender;

private var tr : Transform;
private var lastPosition : Vector3 = Vector3.zero;
private var velocity : Vector3 = Vector3.zero;
private var localVelocity : Vector3 = Vector3.zero;
private var speed : float = 0;
private var angle : float = 0;
private var lowerBodyDeltaAngle : float = 0;
private var idleWeight : float = 0;
private var lowerBodyForwardTarget : Vector3 = Vector3.forward;
private var lowerBodyForward : Vector3 = Vector3.forward;
private var bestAnimation : MoveAnimation = null;
private var lastFootstepTime : float = 0;
private var lastAnimTime : float = 0;

public var animationComponent : Animation;
private var firing : boolean = false;

function Awake () {
	tr = rigid.transform;
	lastPosition = tr.position;
	
	for (var moveAnimation : MoveAnimation in moveAnimations) {
		moveAnimation.Init ();
		animationComponent[moveAnimation.clip.name].layer = 1;
		animationComponent[moveAnimation.clip.name].enabled = true;
	}
	animationComponent.SyncLayer (1);
	
	animationComponent[idle.name].layer = 2;
	animationComponent[idle.name].enabled = true;
	
	//animationComponent[idle.name].weight = 1;


	animationComponent[run.name].layer = 4;
	animationComponent[run.name].speed = 0.6;
	animationComponent[run.name].blendMode = AnimationBlendMode.Blend;
	animationComponent[run.name].weight = 1;

	animationComponent[shootAdditive.name].layer = 10;
	animationComponent[shootAdditive.name].weight = 1;
	animationComponent[shootAdditive.name].speed = 0.6;
	animationComponent[shootAdditive.name].blendMode = AnimationBlendMode.Blend;

	
	animationComponent[forwardAim.name].layer = 4;
	animationComponent[forwardAimRight.name].layer = 4;
	animationComponent[forwardAimLeft.name].layer = 4;

	animationComponent[backwardAim.name].layer = 4;
	animationComponent[backwardAimRight.name].layer = 4;
	animationComponent[backwardAimLeft.name].layer = 4;

	animationComponent[forwardAim.name].blendMode = AnimationBlendMode.Blend;
	animationComponent[forwardAimRight.name].blendMode = AnimationBlendMode.Blend;
	animationComponent[forwardAimLeft.name].blendMode = AnimationBlendMode.Blend;

	animationComponent[backwardAim.name].blendMode = AnimationBlendMode.Blend;
	animationComponent[backwardAimRight.name].blendMode = AnimationBlendMode.Blend;
	animationComponent[backwardAimLeft.name].blendMode = AnimationBlendMode.Blend;

	animationComponent[forwardAim.name].weight = 1;
	animationComponent[forwardAimRight.name].weight = 1;
	animationComponent[forwardAimLeft.name].weight = 1;

	animationComponent[backwardAim.name].weight = 1;
	animationComponent[backwardAimRight.name].weight = 1;
	animationComponent[backwardAimLeft.name].weight = 1;

	animationComponent[forwardAim.name].speed = 0.4;
	animationComponent[forwardAimRight.name].speed = 0.6;
	animationComponent[forwardAimLeft.name].speed = 0.6;


	animationComponent[backwardAim.name].speed = 0.6;
	animationComponent[backwardAimRight.name].speed = 0.6;
	animationComponent[backwardAimLeft.name].speed = 0.6;
	
	animationComponent[death.name].layer = 4;
	animationComponent[death.name].enabled = true;
	
	animationComponent.SyncLayer(4);

	animationComponent[magic.name].layer = 4;
	animationComponent[magic.name].weight = 1;
	animationComponent[magic.name].enabled = true;

	//animation[turn.name].enabled = true;
}

function OnStartFire () {
	firing = true;
	animationComponent[shootAdditive.name].enabled = true;
}

function OnStopFire () {
	firing = false;
	animationComponent[shootAdditive.name].enabled = false;
}

function FixedUpdate () {
	velocity = (tr.position - lastPosition) / Time.deltaTime;
	localVelocity = tr.InverseTransformDirection (velocity);
	localVelocity.y = 0;
	speed = localVelocity.magnitude;
	angle = HorizontalAngle (localVelocity);
	
	lastPosition = tr.position;
}

function Update () {
	idleWeight = Mathf.Lerp (idleWeight, Mathf.InverseLerp (minWalkSpeed, maxIdleSpeed, speed), Time.deltaTime * 10);
	animationComponent[idle.name].weight = idleWeight;

	if(rigid.velocity == Vector3(0, 0, 0))
	{
		speed = 0;
	}
	/*
	if (speed > 0) {
		var smallestDiff : float = Mathf.Infinity;
		for (var moveAnimation : MoveAnimation in moveAnimations) {
			var angleDiff : float = Mathf.Abs(Mathf.DeltaAngle (angle, moveAnimation.angle));
			var speedDiff : float = Mathf.Abs (speed - moveAnimation.speed);
			var diff : float = angleDiff + speedDiff;
			if (moveAnimation == bestAnimation)
				diff *= 0.9;
			
			if (diff < smallestDiff) {
				bestAnimation = moveAnimation;
				smallestDiff = diff;
			}
		}
		
		animationComponent.CrossFade (bestAnimation.clip.name);
	}

	else {
		bestAnimation = null;
	}
	
	if (lowerBodyForward != lowerBodyForwardTarget && idleWeight >= 0.9)
		animationComponent.CrossFade (turn.name, 0.05);
	
	if (bestAnimation && idleWeight < 0.9) {
		var newAnimTime = Mathf.Repeat (animationComponent[bestAnimation.clip.name].normalizedTime * 2 + 0.1, 1);
		if (newAnimTime < lastAnimTime) {
			if (Time.time > lastFootstepTime + 0.1) {
				footstepSignals.SendSignals (this);
				lastFootstepTime = Time.time;
			}
		}
		lastAnimTime = newAnimTime;
	}
	*/
	if(transform.parent.GetComponent.<Health>().health > 0)
	{
	if(speed > 0 && firing == false) //walking, and no firing
	{
		animationComponent.CrossFade(run.name);
		animationComponent[run.name].wrapMode = WrapMode.Loop;
	}
	else if(speed == 0 && firing == false) //no firing, no walking
	{	
		animationComponent.CrossFade(idle.name, 0.1, PlayMode.StopAll);
		animationComponent[idle.name].wrapMode = WrapMode.Loop;

	}
	else if(speed == 0 && firing == true) //firing when the player is standstill
	{
		Debug.Log("Player Speed" + speed);
		Debug.Log("firing when the player is standstill");
		animationComponent[forwardAim.name].enabled = false;
		animationComponent.CrossFade(shootAdditive.name, 0.01, PlayMode.StopAll);
		//animationComponent[shootAdditive.name].wrapMode = WrapMode.ClampForever;
	}
	else if(speed > 0 && firing == true)
	{
		Debug.Log("firing when the player is walking");
		animationComponent[shootAdditive.name].enabled = false;

		CheckPlayerDirection();
	}
	
	}
	else
	{
		animationComponent.CrossFade(death.name, 0.1, PlayMode.StopAll);
		animationComponent[death.name].wrapMode = WrapMode.ClampForever;
	}

}

function CheckPlayerDirection()
{

	//var lastPos : Vector3 = Vector3.zero;

	if(lastPosition == Vector3.zero)
	{
		lastPosition = tr.position;
	}

	var curPos : Vector3 = tr.position;

	var curAngle : float = Vector3.Angle((curPos - lastPosition).normalized, tr.forward);
	//Debug.Log("currentAngle" + curAngle);

	var clockwise : double = angleDir(tr.forward, (curPos - lastPosition).normalized, Vector3.up);

	if(curAngle < 30)
	{
		animationComponent.CrossFade(forwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[forwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in forward.");	
	}
	
	if(curAngle > 30 && curAngle < 150 && clockwise > 0)    //forwardAimLeft
	{
		animationComponent.CrossFade(forwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[forwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in forward left.");	
	}
	if(curAngle > 30 && curAngle < 150 && clockwise < 0)  //forwardAimRight
	{
		animationComponent.CrossFade(forwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[forwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in forward right.");
	}
	
	if(curAngle > 150)
	{
		animationComponent.CrossFade(backwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[backwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in backward.");	
	}

	if(curAngle > 150 && clockwise > 0) //backwardAimLeft
	{
		animationComponent.CrossFade(backwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[backwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in backward left.");	
	}

	if(curAngle > 150 && clockwise < 0) //backwardAimRight
	{
		animationComponent.CrossFade(backwardAim.name, 0.1, PlayMode.StopAll);
		animationComponent[backwardAim.name].wrapMode = WrapMode.Loop;
		Debug.Log("I'm shooting in backward right.");	
	}

	lastPosition = curPos;
}

function angleDir(fwd : Vector3, targetDir : Vector3, up : Vector3) : double
{
	var prep : Vector3 = Vector3.Cross(fwd, targetDir);
	var dir : float = Vector3.Dot(prep, up);

	if(dir > 0.0)
	{
		return 1.0;
	}
	else if(dir < 0.0)
	{
		return -1.0;
	}
	else
	{
		return 0.0;
	}
}
/*
function LateUpdate () {
	var idle : float = Mathf.InverseLerp (minWalkSpeed, maxIdleSpeed, speed);
	
	if (idle < 1) {
		// Calculate a weighted average of the animation velocities that are currently used
		var animatedLocalVelocity : Vector3 = Vector3.zero;
		for (var moveAnimation : MoveAnimation in moveAnimations) {
			// Ignore this animation if its weight is 0
			if (animationComponent[moveAnimation.clip.name].weight == 0)
				continue;
			
			// Ignore this animation if its velocity is more than 90 degrees away from current velocity
			if (Vector3.Dot (moveAnimation.velocity, localVelocity) <= 0)
				continue;
			
			// Add velocity of this animation to the weighted average
			animatedLocalVelocity += moveAnimation.velocity * animationComponent[moveAnimation.clip.name].weight;
		}
		
		// Calculate target angle to rotate lower body by in order
		// to make feet run in the direction of the velocity
		var lowerBodyDeltaAngleTarget : float = Mathf.DeltaAngle (
			HorizontalAngle (tr.rotation * animatedLocalVelocity),
			HorizontalAngle (velocity)
		);
		
		// Lerp the angle to smooth it a bit
		lowerBodyDeltaAngle = Mathf.LerpAngle (lowerBodyDeltaAngle, lowerBodyDeltaAngleTarget, Time.deltaTime * 10);
		
		// Update these so they're ready for when we go into idle
		lowerBodyForwardTarget = tr.forward;
		lowerBodyForward = Quaternion.Euler (0, lowerBodyDeltaAngle, 0) * lowerBodyForwardTarget;
	}
	else {
		// Turn the lower body towards it's target direction
		lowerBodyForward = Vector3.RotateTowards (lowerBodyForward, lowerBodyForwardTarget, Time.deltaTime * 520 * Mathf.Deg2Rad, 1);
		
		// Calculate delta angle to make the lower body stay in place
		lowerBodyDeltaAngle = Mathf.DeltaAngle (
			HorizontalAngle (tr.forward),
			HorizontalAngle (lowerBodyForward)
		);
		
		// If the body is twisted more than 80 degrees,
		// set a new target direction for the lower body, so it begins turning
		if (Mathf.Abs(lowerBodyDeltaAngle) > 80)
			lowerBodyForwardTarget = tr.forward;
	}
	
	// Create a Quaternion rotation from the rotation angle
	var lowerBodyDeltaRotation : Quaternion = Quaternion.Euler (0, lowerBodyDeltaAngle, 0);
	
	// Rotate the whole body by the angle
	rootBone.rotation = lowerBodyDeltaRotation * rootBone.rotation;
	
	// Counter-rotate the upper body so it won't be affected
	upperBodyBone.rotation = Quaternion.Inverse (lowerBodyDeltaRotation) * upperBodyBone.rotation;
	
}
*/
static function HorizontalAngle (direction : Vector3) {
	return Mathf.Atan2 (direction.x, direction.z) * Mathf.Rad2Deg;
}

function OnMagic()
{
	Debug.Log("OnMagicCalled");
	//animationComponent.Play(magic.name);
	animationComponent.CrossFade(magic.name, 0.1, PlayMode.StopAll);
	animationComponent[magic.name].speed = 0.1;
	animationComponent[magic.name].blendMode = AnimationBlendMode.Blend;
	
}