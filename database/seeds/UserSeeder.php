<?php

use App\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
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
        $data = 5;
        $public_img = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
        for ($i = 0; $i < $data; $i++) {
            User::insert([
                'name' => $factory->name,
                'email' => $factory->email,
                'phone' => $factory->numerify('##########'),
                'profile_pic' => '/profile-pic/' . $public_img[rand(0,4)],
                'password' => Hash::make('admin'),
            ]);
        }

    }
}
