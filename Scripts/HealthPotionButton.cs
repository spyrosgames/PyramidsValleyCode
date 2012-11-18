using UnityEngine;
using System.Collections;

public class HealthPotionButton : MonoBehaviour {
	private GameObject player;
	private Health playerHealthObj;
	private Globals globals;
	public GameObject healthPotionsLabelGO;
	private UILabel healthPotionsLabel;
	
	void Awake()
	{
		globals = Globals.GetInstance();
	
		player = GameObject.FindWithTag("Player");
		playerHealthObj = player.GetComponent<Health>();
		
		healthPotionsLabel = healthPotionsLabelGO.GetComponent<UILabel>();
		
		healthPotionsLabel.text = globals.healthPotionsNumber + "";
		
		GetComponent<UIButtonSound>().volume = 0;
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnClick()
	{
		if(globals.healthPotionsNumber > 0 && playerHealthObj.health < playerHealthObj.maxHealth)
		{
			GetComponent<UIButtonSound>().volume = 1;
			Debug.Log("globals.healthPotionsNumber " + globals.healthPotionsNumber);
			globals.healthPotionsNumber -= 1;
			PlayerPrefs.SetInt("healthPotionsNumber", globals.healthPotionsNumber);
			healthPotionsLabel.text = globals.healthPotionsNumber + "";
			playerHealthObj.health = playerHealthObj.maxHealth;
		}
		else
		{
			GetComponent<UIButtonSound>().volume = 0;	
		}
		
		
	}
}
