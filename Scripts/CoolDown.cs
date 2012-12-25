using UnityEngine;
using System.Collections;

public class CoolDown : MonoBehaviour {
	public float magicAttackTimer;
	public float magicCoolDown;
	
	public GameObject CoolDownGO;
	private UIFilledSprite coolDownSprite;
	
	private Hashtable magicsCoolDownTable;
	
	private Globals globals;
	void Awake()
	{
		magicsCoolDownTable = new Hashtable();
		globals = Globals.GetInstance();
		coolDownSprite = CoolDownGO.GetComponent<UIFilledSprite>();
	}
	
	// Use this for initialization
	void Start () {
		magicCoolDown = globals.magicCoolDown;
		if(magicCoolDown == 0)
		{
			magicCoolDown = 5;
			globals.magicCoolDown = 5;
			PlayerPrefs.SetFloat("magicCoolDown", magicCoolDown);
		}
	}
	
	// Update is called once per frame
	void Update () {
		MagicCoolDownCheck();
	}
	
	void MagicCoolDownCheck()
	{
		if(magicAttackTimer > 0)
		{
			magicAttackTimer -= Time.deltaTime;
		}
		if(magicAttackTimer < 0)
		{
			magicAttackTimer = 0;
		}
		if(magicAttackTimer == 0)
		{
			//magicCoolDownGUITexture.texture = null;
		}
		
		coolDownSprite.fillAmount = ( (magicCoolDown - magicAttackTimer) / magicCoolDown);
		//coolDownSprite.fillAmount = ( magicAttackTimer / magicCoolDown);
	}
	
	/*
	void MagicCoolDownCheckOld()
	{
		if(magicAttackTimer > 0)
		{
			magicAttackTimer -= Time.deltaTime;
		
			if(magicAttackTimer >=0 * magicCoolDown && magicAttackTimer < 0.0625 * magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[5];
				highlightAnimationsSignals.SendSignals(this);
			}
			
			if(magicAttackTimer > 0.0625 * magicCoolDown && magicAttackTimer < 0.125 * magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[4];
			}
			
			if(magicAttackTimer > 0.125 * magicCoolDown && magicAttackTimer < 0.25 * magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[3];
			}
			
			if(magicAttackTimer > 0.375 * magicCoolDown && magicAttackTimer < 0.5 * magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[2];
			}
			
			if(magicAttackTimer > 0.625 * magicCoolDown && magicAttackTimer < 0.75 * magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[1];
			}
			
			if(magicAttackTimer > 0.875 * magicCoolDown && magicAttackTimer < magicCoolDown)
			{
				magicCoolDownGUITexture.texture = coolDownTextures[0]; 
			}
		}
		if(magicAttackTimer < 0)
		{
			magicAttackTimer = 0;
		}
		if(magicAttackTimer == 0)
		{
			//magicCoolDownGUITexture.texture = null;
		}
	}
	*/
}
