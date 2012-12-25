using UnityEngine;
using System.Collections;

public class PlayerHealthbar : MonoBehaviour {
	private UISlider playerHealthSlider;
	public GameObject playerHealthBar;
	private float maxWidth;
	
	private Health healthObj;
	private float health;
	private float maxHealth;
	
	void Awake()
	{
		playerHealthSlider = playerHealthBar.GetComponent<UISlider>();
		
		if(playerHealthSlider == null)
		{
			Debug.LogError("Couldn't get the UISlider component in PlayerHealthbar script.");
			return;
		}
		maxWidth = playerHealthSlider.foreground.localScale.x;
		
		healthObj = this.gameObject.GetComponent<Health>();
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		health = healthObj.health;
		maxHealth = healthObj.maxHealth;
		
		UpdateDisplay((health / maxHealth));
	}
	
	void UpdateDisplay(float x)
	{
		if(x < 0)
		{
			x = 0;
		}
		if(x > 1)
		{
			x = 1;
		}
		
		playerHealthSlider.foreground.localScale = new Vector3(maxWidth * x, playerHealthSlider.foreground.localScale.y, playerHealthSlider.foreground.localScale.z);
	}
	
}
