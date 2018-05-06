package com.example.orv.androidhackathon;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.firebase.iid.FirebaseInstanceId;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {

    Context mainActivityContext = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (FirebaseInstanceId.getInstance().getToken() != null) {
            Log.v("FB_TOKEN", FirebaseInstanceId.getInstance().getToken());
        }


        if (getIntent() != null && getIntent().getExtras() != null) {
            if (getIntent().getExtras().get("imgLink") != null) {

                DownloadImageWithURLTask downloadTask = new DownloadImageWithURLTask();
                downloadTask.execute((String) getIntent().getExtras().get("imgLink"));
            }

//            if (getIntent().getStringExtra("content") != null) {
//                String content = getIntent().getStringExtra("content");
//                Toast.makeText(this, content, Toast.LENGTH_SHORT).show();
//                Log.v("FB_CONTENT", content);
//            }

            if (getIntent().getExtras().get("theImage") != null) {
                Bitmap bitmap = (Bitmap) getIntent().getExtras().get("theImage");

                ((ImageView) findViewById(R.id.Given_Image)).setImageBitmap(bitmap);
            }
        }
    }

    public void OnClick_Open(View view) {
        RequestQueue requestQueue = Volley.newRequestQueue(mainActivityContext);
        String url = "http://10.20.17.181:3000/tryPOST";

        StringRequest MyStringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                Toast.makeText(mainActivityContext, "Success!", Toast.LENGTH_SHORT).show();
            }
        }, new Response.ErrorListener() {
            //Create an error listener to handle errors appropriately.
            @Override
            public void onErrorResponse(VolleyError error) {
                //This code is executed if there is an error.
                Toast.makeText(mainActivityContext, "Failed!", Toast.LENGTH_SHORT).show();
            }
        }) {
            protected Map<String, String> getParams() {
                Map<String, String> MyData = new HashMap<>();
                MyData.put("Action", "OPEN");
                MyData.put("ID", FirebaseInstanceId.getInstance().getToken());
                return MyData;
            }
        };

        requestQueue.add(MyStringRequest);
    }

    public void OnClick_Busy(View view) {
        RequestQueue requestQueue = Volley.newRequestQueue(mainActivityContext);
        String url = "http://10.20.17.181:3000/tryPOST";

        StringRequest MyStringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                Toast.makeText(mainActivityContext, "Success!", Toast.LENGTH_SHORT).show();
            }
        }, new Response.ErrorListener() {
            //Create an error listener to handle errors appropriately.
            @Override
            public void onErrorResponse(VolleyError error) {
                //This code is executed if there is an error.
                Toast.makeText(mainActivityContext, "Failed!", Toast.LENGTH_SHORT).show();
            }
        }) {
            protected Map<String, String> getParams() {
                Map<String, String> MyData = new HashMap<>();
                MyData.put("Action", "BUSY");
                MyData.put("ID", FirebaseInstanceId.getInstance().getToken());
                return MyData;
            }
        };

        requestQueue.add(MyStringRequest);
    }

    @Override
    protected void onNewIntent(Intent intent) {
//        if (intent != null && intent.getExtras()!=null && intent.getExtras().get("theImage") != null) {
//            String content = intent.getStringExtra("content");
//            Toast.makeText(this, content, Toast.LENGTH_SHORT).show();

//            Bitmap bitmap = (Bitmap) intent.getExtras().get("theImage");
//
//            ((ImageView) findViewById(R.id.Given_Image)).setImageBitmap(bitmap);
////            Log.v("FB_CONTENT", content);
//
//        }

        if (intent != null && intent.getStringExtra("token") != null) {
            String message = intent.getStringExtra("token");
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
            Log.v("FB_TOKEN", FirebaseInstanceId.getInstance().getToken());
        }

        if (intent.getExtras().get("imgLink") != null) {

            DownloadImageWithURLTask downloadTask = new DownloadImageWithURLTask();
            downloadTask.execute((String) intent.getExtras().get("imgLink"));
        }
    }

    private class DownloadImageWithURLTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage = findViewById(R.id.Given_Image);

        protected Bitmap doInBackground(String... urls) {
            String pathToFile = urls[0];
            Bitmap bitmap = null;
            try {
                InputStream in = new java.net.URL(pathToFile).openStream();
                bitmap = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return bitmap;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
    }

    private class SendJSONPostRequest extends AsyncTask<String, Void, Boolean> {

        protected Boolean doInBackground(String... urls) {
            RequestQueue requestQueue = Volley.newRequestQueue(mainActivityContext);
            String url = "http://10.20.17.181:3000/tryPOST";

            StringRequest MyStringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {

                @Override
                public void onResponse(String response) {
                }
            }, new Response.ErrorListener() {
                //Create an error listener to handle errors appropriately.
                @Override
                public void onErrorResponse(VolleyError error) {
                    //This code is executed if there is an error.
                }
            }) {
                protected Map<String, String> getParams() {
                    Map<String, String> MyData = new HashMap<>();
                    MyData.put("Action", "OPEN");
                    MyData.put("ID", FirebaseInstanceId.getInstance().getToken());
                    return MyData;
                }
            };

            requestQueue.add(MyStringRequest);

            return true;
        }

        protected void onPostExecute(Boolean result) {

        }
    }
}
