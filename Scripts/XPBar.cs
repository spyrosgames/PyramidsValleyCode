using UnityEngine;
using System.Collections;

public class XPBar : MonoBehaviour {
	private UISlider XPBarSlider;
	public GameObject XPBarSliderGO;
	private Globals globals;
	private float XPPoints;
	private float XPMaximum;
	private float manaMaximum;
	public GUIText LevelUpText;
	private GameObject player;
	
	private float maxWidth;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		XPBarSlider = XPBarSliderGO.GetComponent<UISlider>();
		maxWidth = XPBarSlider.foreground.localScale.x;
		
		if(XPBarSlider == null)
		{
			Debug.LogError("Couldn't get the UISlider component in XPBar Script.");	
		}
		
		XPMaximum = globals.XPMaximum;
		if(XPMaximum == 0)
		{
			globals.XPPoints = 0;
			PlayerPrefs.SetInt("XP", 0);
			XPMaximum = 100;
			globals.XPMaximum = 100;
			PlayerPrefs.SetInt("XPMaximum", 100);
			Debug.Log("This is the first time XP bar is used.");
		}
		
		//XPBar.pixelInset.width = globals.XPPoints / (globals.XPMaximum / 100);
		XPPoints = globals.XPPoints;
		UpdateDisplay((XPPoints / XPMaximum));
		player = GameObject.FindWithTag("Player");
		
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
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
		
		XPBarSlider.foreground.localScale = new Vector3(maxWidth * x, XPBarSlider.foreground.localScale.y, XPBarSlider.foreground.localScale.z);
	}
	
	void OnDamageSignal()
	{
		
		if(globals.XPPoints == XPMaximum)
		{
			XPMaximum += 10;
			globals.XPMaximum = globals.XPMaximum + 10;
			PlayerPrefs.SetFloat("XPMaximum", XPMaximum);
			
			globals.XPPoints = 0;
			PlayerPrefs.SetFloat("XP", 0);
			
			globals.manaMaximum = globals.manaMaximum + 10;
			PlayerPrefs.SetFloat("manaMaximum", globals.manaMaximum);
			
			globals.playerMaxHealth = globals.playerMaxHealth + 10;
			PlayerPrefs.SetFloat("playerMaxHealth", globals.playerMaxHealth); 
			player.GetComponent<Health>().maxHealth = globals.playerMaxHealth;
			player.GetComponent<Health>().health = globals.playerMaxHealth;
	      
			globals.level += 1;
			PlayerPrefs.SetInt("Level", globals.level);
			
			LevelUpText.text = "Level Up!";
			//iTween LevelUp Animation goes here
			Debug.Log("XPMaximum = " + XPMaximum + ", manaMaximum = " + manaMaximum);
			AnimateLevelUp();
		}
		Debug.Log("OnDamageSignal XP : " + globals.XPPoints + " XPMaximum" + XPMaximum);
		
		XPMaximum = globals.XPMaximum;
		XPPoints = globals.XPPoints;
		UpdateDisplay((XPPoints / XPMaximum));

		//XPBar.pixelInset.width = globals.XPPoints / (globals.XPMaximum / 100);
	}

	void AnimateLevelUp()
	{
		Debug.Log("Level Up");
		iTween.ValueTo(gameObject, iTween.Hash("from", new Vector2(-40, 150), "to", new Vector2(70,150),"time",7.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
		iTween.ValueTo(gameObject, iTween.Hash("from", new Vector2(70, 150), "to", new Vector2(600,150),"time",7.0,"delay",4.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
	}

	void AnimateGUITextPixelOffset(Vector2 pixelOffset){
	    LevelUpText.pixelOffset = pixelOffset;
	}
	
}
