#pragma strict
public var ImageDisplayXYHorizontalGO : GameObject;
private var ImageDisplayXYHorizontalObj : ImageDisplayXYHorizontal;

function Awake()
{
	ImageDisplayXYHorizontalObj = ImageDisplayXYHorizontalGO.GetComponent.<ImageDisplayXYHorizontal>();
	
	if(iPhone.generation == iPhoneGeneration.iPad2Gen || iPhone.generation == iPhoneGeneration.iPhone4 || iPhone.generation == iPhoneGeneration.iPhone4S)
	{
		Debug.Log("iPad2Gen, iPhone4, iPhone4S");
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/1024/BeforeWaveOne1") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/1024/BeforeWaveOne2") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/1024/BeforeWaveOne3") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/1024/BeforeWaveOne4") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/1024/BeforeWaveOne5") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/1024/BeforeWaveOne6") as Texture;
		
		
		ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/1024/BeforeAntagonist1") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/1024/AfterAntagonist1") as Texture;
		
	}
	else if(iPhone.generation == iPhoneGeneration.iPad3Gen || iPhone.generation == iPhoneGeneration.iPhone5)
	{
		Debug.Log("iPad3Gen, iPhone5");
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/2048/BeforeWaveOne1") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/2048/BeforeWaveOne2") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/2048/BeforeWaveOne3") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/2048/BeforeWaveOne4") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/2048/BeforeWaveOne5") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/2048/BeforeWaveOne6") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/2048/BeforeAntagonist1") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/2048/AfterAntagonist1") as Texture;
	}
	else if(iPhone.generation == iPhoneGeneration.iPhone3GS)
	{
		Debug.Log("iPhone3GS");
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/512/BeforeWaveOne1") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/512/BeforeWaveOne2") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/512/BeforeWaveOne3") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/512/BeforeWaveOne4") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/512/BeforeWaveOne5") as Texture;
		ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/512/BeforeWaveOne6") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/512/BeforeAntagonist1") as Texture;
		
		ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/512/AfterAntagonist1") as Texture;
	}
	
	else
	{
		if(Screen.currentResolution.height <= 512)
		{
			//512
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/512/BeforeWaveOne1") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/512/BeforeWaveOne2") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/512/BeforeWaveOne3") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/512/BeforeWaveOne4") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/512/BeforeWaveOne5") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/512/BeforeWaveOne6") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/512/BeforeAntagonist1") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/512/AfterAntagonist1") as Texture;
		}
		else if(Screen.currentResolution.height > 512 && Screen.currentResolution.height <= 1024)
		{
			//1024
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/1024/BeforeWaveOne1") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/1024/BeforeWaveOne2") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/1024/BeforeWaveOne3") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/1024/BeforeWaveOne4") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/1024/BeforeWaveOne5") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/1024/BeforeWaveOne6") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/1024/BeforeAntagonist1") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/1024/AfterAntagonist1") as Texture;
		}
		else if(Screen.currentResolution.height > 1024 && Screen.currentResolution.height <= 2048)
		{
			//2048
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[0] = Resources.Load("FinalComics/2048/BeforeWaveOne1") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[1] = Resources.Load("FinalComics/2048/BeforeWaveOne2") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[2] = Resources.Load("FinalComics/2048/BeforeWaveOne3") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[3] = Resources.Load("FinalComics/2048/BeforeWaveOne4") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[4] = Resources.Load("FinalComics/2048/BeforeWaveOne5") as Texture;
			ImageDisplayXYHorizontalObj.comicsImagesBeforeWaveOne[5] = Resources.Load("FinalComics/2048/BeforeWaveOne6") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesBeforeAntagonist[0] = Resources.Load("FinalComics/2048/BeforeAntagonist1") as Texture;
			
			ImageDisplayXYHorizontalObj.comicsImagesAfterAntagonist[0] = Resources.Load("FinalComics/2048/AfterAntagonist1") as Texture;
		}
	
	}
	
}

function Start () {

}

function Update () {

}