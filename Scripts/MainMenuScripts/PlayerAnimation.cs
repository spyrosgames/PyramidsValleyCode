using UnityEngine;
using System.Collections;

public class PlayerAnimation : MonoBehaviour {
	public AnimationClip idleAnimation;
	
	// Use this for initialization
	void Start () {
		animation[idleAnimation.name].wrapMode = WrapMode.Loop;
		animation.Play(idleAnimation.name);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
