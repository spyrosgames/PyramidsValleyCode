using UnityEngine;
using System.Collections;

public class HUDSInitialization : MonoBehaviour {
	public UILabel CoinsHUD;
	public UILabel JewelsHUD;
	private Globals globals;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		CoinsHUD.text = globals.coins + "";
		JewelsHUD.text = globals.jewels + "";
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
