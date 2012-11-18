using UnityEngine;
using System.Collections;

public class ManaBar : MonoBehaviour {
	private UISlider manaSlider;
	public GameObject manaSliderGO;
	private Globals globals;
	private float mana;
	private float manaMaximum;
	
	private float maxWidth;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		manaSlider = manaSliderGO.GetComponent<UISlider>();
		maxWidth = manaSlider.foreground.localScale.x;
		
		if(manaSlider == null)
		{
			Debug.LogError("Couldn't get the UISlider component in ManaBar Script.");	
		}
		
		manaMaximum = globals.manaMaximum;
		if(manaMaximum == 0)
		{
			manaMaximum = 100;
			globals.manaMaximum = manaMaximum;
			PlayerPrefs.SetFloat("manaMaximum", 100);
		}
		Debug.Log("manaMaximum " + manaMaximum);
		globals.mana = manaMaximum;
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		mana = globals.mana;
		manaMaximum = globals.manaMaximum;
		
		UpdateDisplay((mana / manaMaximum));
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
		
		manaSlider.foreground.localScale = new Vector3(maxWidth * x, manaSlider.foreground.localScale.y, manaSlider.foreground.localScale.z);
	}
}
