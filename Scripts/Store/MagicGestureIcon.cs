using UnityEngine;
using System.Collections;

public class MagicGestureIcon : MonoBehaviour {
	public GameObject GesturesIconGO;
	private UISprite gesturesIconUISprite;
	public string gestureSpriteName;
	public string magicName;
	
	public GameObject MagicNameGO;
	private UILabel magicNameLabel;
	
	void Awake()
	{
		gesturesIconUISprite = GesturesIconGO.GetComponent<UISprite>();
		magicNameLabel = MagicNameGO.GetComponent<UILabel>();
	}
	
	void OnClick()
	{
		gesturesIconUISprite.spriteName = gestureSpriteName;
		magicNameLabel.text = magicName;	
	}
}
