using UnityEngine;
using System.Collections;

public class LevelNumber : MonoBehaviour {
	private Globals globals;
	private UILabel levelNumberLabel;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		levelNumberLabel = GetComponent<UILabel>();
		if(globals.level == 0)
		{
			globals.level = 1;
			PlayerPrefs.SetInt("Level", 1);
		}
		levelNumberLabel.text = "Level " + globals.level;
		
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
