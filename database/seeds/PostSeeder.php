<?php

use App\Posts;
use Illuminate\Database\Seeder;
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data =[
            1=>[
                'post_by'=> 1,
                'like_by'=>null,
                'title'=> 'Senior journalist Ravish Tiwari passes away',
                'description'=>'An engineering graduate from IIT Bombay in metallurgy and material science, and a post graduate in Comparative Social Policy from the university of Oxford, Tiwari was also a recipient of the prestigious Rhodes Scholarship. Tiwars career in journalism was marked by insightful stories and analyses on political developments and social matters.',
            ],
            2=>[
                'post_by'=> 2,
                'like_by'=>null,
                'title'=> 'Senior journalist Ravish Tiwari passes away',
                'description'=>'An engineering graduate from IIT Bombay in metallurgy and material science, and a post graduate in Comparative Social Policy from the university of Oxford, Tiwari was also a recipient of the prestigious Rhodes Scholarship. Tiwars career in journalism was marked by insightful stories and analyses on political developments and social matters.',
            ],
            3=>[
                'post_by'=> 3,
                'like_by'=>null,
                'title'=> 'Senior journalist Ravish Tiwari passes away',
                'description'=>'An engineering graduate from IIT Bombay in metallurgy and material science, and a post graduate in Comparative Social Policy from the university of Oxford, Tiwari was also a recipient of the prestigious Rhodes Scholarship. Tiwars career in journalism was marked by insightful stories and analyses on political developments and social matters.',
            ],

        ];


        foreach ($data as $key=>$value){

            Posts::insert([

                'post_by'=> $value['post_by'],
                'like_by'=> $value['like_by'],
                'title'=> $value['title'],
                'description'=> $value['description'],

                ]);


        }
    }
}
