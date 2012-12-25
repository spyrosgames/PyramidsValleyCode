using UnityEngine;
using System.Collections;

public class ManaPotionButton : MonoBehaviour {
	private GameObject player;
	private Health playerHealthObj;
	private Globals globals;
	public GameObject manaPotionsLabelGO;
	private UILabel manaPotionsLabel;
	
	void Awake()
	{
		globals = Globals.GetInstance();
	
		player = GameObject.FindWithTag("Player");
		playerHealthObj = player.GetComponent<Health>();
		
		manaPotionsLabel = manaPotionsLabelGO.GetComponent<UILabel>();
		
		manaPotionsLabel.text = globals.manaPotionsNumber + "";
		
		GetComponent<UIButtonSound>().enabled = false;
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnClick()
	{
		if(globals.manaPotionsNumber > 0 && globals.mana < globals.manaMaximum)
		{
			GetComponent<UIButtonSound>().enabled = true;
			Debug.Log("globals.manaPotionsNumber " + globals.manaPotionsNumber);
			globals.manaPotionsNumber -= 1;
			PlayerPrefs.SetInt("manaPotionsNumber", globals.manaPotionsNumber);
			manaPotionsLabel.text = globals.manaPotionsNumber + "";
			globals.mana = globals.manaMaximum;
		}
		else
		{
			GetComponent<UIButtonSound>().enabled = false;	
		}
		
		
	}
}
