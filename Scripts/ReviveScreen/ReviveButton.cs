using UnityEngine;
using System.Collections;

public class ReviveButton : MonoBehaviour {
	public UILabel revivePotionsNumberLabel;
	private int revivePotionsNumber;
	
	public GameObject InGameStore;
	public GameObject ReviveScreen;
	public GameObject HUDs;
	public GameObject NGUIJoysticks;
	
	public GameObject PlayerAnimationComponent;
	public AnimationClip PlayerDeathAnimation;
	
	public GameObject GesturesRecognizer;
	
	private GameObject SacredGroundGO; //the revive visual effect
	
	public GameObject Player;
	private Health playerHealth;
	
	public GameObject ReviveDestructionMagicVisualEffect;
	private GameObject[] enemies;
	
	public SignalSender reviveButtonTweenSignal;
	
	public GameObject ZoomInCameraEffectHelper;
	private ZoomInCameraEffect zoomInCameraEffectObj;
	
	void Awake()
	{	
		revivePotionsNumber = PlayerPrefs.GetInt("revivePotionsNumber");
		UpdateRevivePotionsNumberDisplay(revivePotionsNumber);
		playerHealth = Player.GetComponent<Health>();
		zoomInCameraEffectObj = ZoomInCameraEffectHelper.GetComponent<ZoomInCameraEffect>();
	}
	
	void OnClick()
	{
		if(revivePotionsNumber > 0)
		{
			
			zoomInCameraEffectObj.ZoomInCamera();
			
			//Subtract one revive potion
			revivePotionsNumber -= 1;
			PlayerPrefs.SetInt("revivePotionsNumber", revivePotionsNumber);
			
			//Update the revive potions number
			UpdateRevivePotionsNumberDisplay(revivePotionsNumber);

			//Revive Action
			
			//Instantiate the revive visual effect
			SacredGroundGO = Resources.Load("sacredGroundModified") as GameObject;
			
			GameObject sacredGround = Instantiate(SacredGroundGO, Player.transform.position, Quaternion.identity) as GameObject;
			sacredGround.transform.parent = Player.transform;
			
			ReviveMagicEffect();
			
			Player.rigidbody.constraints = RigidbodyConstraints.None;
			Player.rigidbody.constraints = RigidbodyConstraints.FreezePositionY | RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
			
			HUDs.SetActiveRecursively(true);
			NGUIJoysticks.SetActiveRecursively(true);
			
			GesturesRecognizer.active = true;
			
			//Refill player's health
			playerHealth.health = playerHealth.maxHealth;
			playerHealth.dead = false;
			playerHealth.onlyOnce = true;
			
			//Play the player's animation in reverse
			
			//Reverse the die animation
			PlayerAnimationComponent.animation["Death"].speed = -1;
			PlayerAnimationComponent.animation.CrossFade("Death");
			
			ReviveScreen.SetActiveRecursively(false);
			
		}
		else
		{
			//Display the in-game store to buy the revive potion
			InGameStore.SetActiveRecursively(true);
			
			//Tween the buy button of the revive potion and display tweening on the rest of items
			reviveButtonTweenSignal.SendSignals(this);
		}
		
	}
	
	void UpdateRevivePotionsNumberDisplay(int revivePotionsDisplayNumber)
	{
		revivePotionsNumberLabel.text = "( " + revivePotionsDisplayNumber + " revives left )";	
	}
	
	private void ReviveMagicEffect()
	{	
		enemies = GameObject.FindGameObjectsWithTag("Enemy");
		
		for(int i = 0; i < enemies.Length; i++)
		{

			Health enemyHealth = enemies[i].transform.GetComponent<Health>();
			
			Instantiate(ReviveDestructionMagicVisualEffect, new Vector3(enemies[i].gameObject.transform.position.x, enemies[i].gameObject.transform.position.y + 3, enemies[i].gameObject.transform.position.z), Quaternion.identity);
			
			if(enemyHealth.health > 0 && enemies[i].GetComponent<NewAIFollowJavaScript>().isDead == false && enemyHealth.dead == false)
			{
				enemyHealth.OnDamage(100, -enemies[i].transform.forward);	
			}
			//yield return new WaitForSeconds(0.4f);
		}	
	}
}
