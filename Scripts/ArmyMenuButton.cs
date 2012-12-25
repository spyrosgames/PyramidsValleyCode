using UnityEngine;
using System.Collections;

public class ArmyMenuButton : MonoBehaviour {
	public int armyNumber;
	public GameObject wavesPopupMenu;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnClick()
	{
		PlayerPrefs.SetInt("ArmyNumber", armyNumber);
		Debug.Log("Clicking");
		wavesPopupMenu.SetActiveRecursively(true);
	}
}
