using UnityEngine;

/// <summary>
/// Example script showing how to add UI window that follows an object drawn by another camera.
/// </summary>

[AddComponentMenu("NGUI/Examples/Unit HUD")]
public class UnitHUD : MonoBehaviour
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
	
	private UISlider objectHealthBarSlider;
	
	private Health objectHealth;
	
    void Start ()
    {
		if (target == null) { Destroy(gameObject); return; }
        mTrans = transform;
       	mGameCam = NGUITools.FindCameraForLayer(target.gameObject.layer);
        mUICam = NGUITools.FindCameraForLayer(gameObject.layer);
		
		objectHealthBarSlider = GetComponentInChildren<UISlider>();
		objectHealth = target.GetComponent<Health>();
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
            	mTrans.position = new Vector3(mPos.x - 2.5f, mPos.y + 5, mPos.z);
			}
			else if(target.name == "RangedEnemy")
			{
				mTrans.position = new Vector3(mPos.x - 2.5f, mPos.y + 7, mPos.z);
			}
			else if(target.name == "Slave")
			{
				mTrans.position = new Vector3(mPos.x - 2.5f, mPos.y + 8, mPos.z);	
			}
			else if(target.name == "Antagonist")
			{
				mTrans.position = new Vector3(mPos.x - 2.5f, mPos.y + 9, mPos.z);		
			}
			//mTrans.localScale = new Vector3(10, 10, 1);
			//mTrans.localRotation = Quaternion.Euler(mGameCam.transform.eulerAngles.x, 0, 0);
        }

    }
	
	void Update()
	{
		if(objectHealth.showHealthBar == true)
		{
			if(objectHealth.health > 0 && objectHealth.dead == false && mVisible)
			{
				mTrans.localRotation = Quaternion.Euler(mGameCam.transform.eulerAngles.x, 0, 0);
				mTrans.localScale = new Vector3(10, 10, 1);
				UpdateEnemyHealth(objectHealth.health, objectHealth.maxHealth);
			}
			else
			{
				mTrans.localScale = new Vector3(0, 0, 0);	
			}
		}
	}
	
	void UpdateEnemyHealth(float objectCurrentHealth, float objectMaxHealth)
	{
		objectHealthBarSlider.sliderValue = (objectCurrentHealth / objectMaxHealth);
		//Invoke("FadeOutHealthBar", 6);
	}
	
	void FadeOutHealthBar()
	{
		objectHealth.showHealthBar = false;
		mTrans.localScale = new Vector3(0, 0, 0);	
	}
}