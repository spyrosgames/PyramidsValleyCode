using UnityEngine;

/// <summary>
/// Example script showing how to add UI window that follows an object drawn by another camera.
/// </summary>

[AddComponentMenu("NGUI/Examples/Unit HUD")]
public class TimerHUD : MonoBehaviour
{
    /// <summary>
    /// Target object this UI element should follow.
    /// </summary>
 
    public Transform target;

    Transform mTrans;
    public Camera mGameCam;
    Camera mUICam;
    Vector3 mPos;
    bool mVisible = true;
	
	private Health objectHealth;
	/**
	*Count Down Timer
	*/
	private UILabel counterLabel;
	
	private float startTime;
	private int restSeconds;
	private int roundedRestSeconds;
	private int displaySeconds;
	private int displayMinutes;
	private int countDownSeconds = 240;
	
	private string text;
	/**
	*
	**/
	
    void Start ()
    {
		if (target == null) { Destroy(gameObject); return; }
        mTrans = transform;
       	mGameCam = NGUITools.FindCameraForLayer(target.gameObject.layer);
        mUICam = NGUITools.FindCameraForLayer(gameObject.layer);
		
		objectHealth = target.GetComponent<Health>();
		counterLabel = GetComponentInChildren<UILabel>();
		
		startTime = Time.time;
    }

    void LateUpdate()
    {
        if (target == null) { Destroy(gameObject); return; }

        mPos = mGameCam.WorldToViewportPoint(target.position);
		
        bool visible = (mPos.z > 0f && mPos.x > 0f && mPos.x < 1f && mPos.y > 0f && mPos.y < 1f);

        if (mVisible != visible)
        {
            mVisible = visible;
            UIWidget[] widgets = gameObject.GetComponentsInChildren<UIWidget>();
            foreach (UIWidget w in widgets) w.enabled = mVisible;
        }
        
        if (mVisible)
        {
            mPos = mUICam.ViewportToWorldPoint(mPos);
			//Debug.Log("Second mPos " + mPos);
            //mPos.z = 0f;
			if(target.name == "MeleeEnemy")
			{
            	mTrans.position = new Vector3(mPos.x - 0.5f, mPos.y + 5, mPos.z);
			}
			else if(target.name == "RangedEnemy")
			{
				mTrans.position = new Vector3(mPos.x - 0.5f, mPos.y + 7, mPos.z);
			}
			else if(target.name == "Slave")
			{
				mTrans.position = new Vector3(mPos.x - 0.5f, mPos.y + 10, mPos.z);	
			}
			else if(target.name == "Antagonist")
			{
				mTrans.position = new Vector3(mPos.x - 0.5f, mPos.y + 9, mPos.z);		
			}
			//mTrans.localScale = new Vector3(10, 10, 1);
			//mTrans.localRotation = Quaternion.Euler(mGameCam.transform.eulerAngles.x, 0, 0);
        }

    }
	
	void Update()
	{	
	    //display messages or whatever here -->do stuff based on your timer
	    if (restSeconds >= 0 && restSeconds <= countDownSeconds) {
			float guiTime = Time.time - startTime;

	    	restSeconds = countDownSeconds - (int)(guiTime);
			
	        //display the timer
		    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
		    displaySeconds = roundedRestSeconds % 60;
		    displayMinutes = roundedRestSeconds / 60; 
		
		    text = string.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
		    counterLabel.text = text;
	    }
		
	    if (restSeconds == 0) {
			//do stuff here
			target.transform.gameObject.SetActiveRecursively(false);
			target.GetComponent<AddTimerUnitHUD>().enabled = false;
			GameObject vanishEffect = Resources.Load("VanishEffectModified") as GameObject;
			Instantiate(vanishEffect, target.transform.position, Quaternion.identity);
			Destroy(gameObject);
	    }

		
		if(objectHealth.health > 0 && objectHealth.dead == false && mVisible)
		{
			mTrans.localRotation = Quaternion.Euler(mGameCam.transform.eulerAngles.x, 0, 0);
			//mTrans.localScale = new Vector3(1000, 1000, 1);
		}
		else
		{
			mTrans.localScale = new Vector3(0, 0, 0);	
		}
		
	}

}