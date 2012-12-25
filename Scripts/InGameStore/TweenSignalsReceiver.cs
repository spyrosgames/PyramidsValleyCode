using UnityEngine;
using System.Collections;

public class TweenSignalsReceiver : MonoBehaviour {
	
	public GameObject ReviveButtonGO;
	public GameObject[] HealthPotionButtonGO;
	public GameObject[] ManaPotionButtonGO;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void TweenReviveBuyButton()
	{
		ReviveButtonGO.GetComponent<TweenScale>().enabled = true;
		ReviveButtonGO.GetComponent<TweenScale>().from = new Vector3(90, 30, 1);
		ReviveButtonGO.GetComponent<TweenScale>().to = new Vector3(105, 45, 1);
	}
	
	void TweenHealthPotionBuyButton()
	{
		for(int i = 0; i < HealthPotionButtonGO.Length; i++)
		{
			HealthPotionButtonGO[i].GetComponent<TweenScale>().enabled = true;
			HealthPotionButtonGO[i].GetComponent<TweenScale>().from = new Vector3(90, 30, 1);
			HealthPotionButtonGO[i].GetComponent<TweenScale>().to = new Vector3(105, 45, 1);
		}
	}
	
	void TweenManaPotionBuyButton()
	{
		for(int i = 0; i < ManaPotionButtonGO.Length; i++)
		{
			ManaPotionButtonGO[i].GetComponent<TweenScale>().enabled = true;
			ManaPotionButtonGO[i].GetComponent<TweenScale>().from = new Vector3(90, 30, 1);
			ManaPotionButtonGO[i].GetComponent<TweenScale>().to = new Vector3(105, 45, 1);
		}
	}
}
