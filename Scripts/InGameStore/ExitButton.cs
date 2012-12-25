using UnityEngine;
using System.Collections;

public class ExitButton : MonoBehaviour {
	public GameObject InGameStoreMenu;
	public GameObject WindowRoot;
	private TweenPosition tweenPositionObj;
	
	// Use this for initialization
	void Start () {
		tweenPositionObj = WindowRoot.GetComponent<TweenPosition>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	IEnumerator OnClick()
	{
		tweenPositionObj.enabled = true;
		tweenPositionObj.method = UITweener.Method.EaseOut;
		tweenPositionObj.style = UITweener.Style.Loop;
		//tweenPositionObj.delay = 1;
		tweenPositionObj.from = new Vector3(-74, 117, 0);
		tweenPositionObj.to = new Vector3(2048, 117, 0);
		yield return new WaitForSeconds(1.5f);
		InGameStoreMenu.SetActiveRecursively(false);
	}
}
