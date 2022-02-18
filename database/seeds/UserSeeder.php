<?php

use App\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ini_set('max_execution_time', 0);   #runs forever
        $factory = Factory::create();
        $data=2;
        for($i=0;$i<$data;$i++){

User::insert([
    'name' =>$factory->name,
    'email' =>$factory->email,
    'phone' =>$factory->numerify('##########'),
//    'profile_pic' =>$factory->profile_pic,
    'password' =>Hash::make('admin'),
//    'ip_address' =>$factory->ip_address,

]);

        }
    }
}
