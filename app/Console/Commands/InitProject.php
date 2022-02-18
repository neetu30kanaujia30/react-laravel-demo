<?php
namespace App\Console\Commands;
use Illuminate\Console\Command;
/**
 * Class InitProject
 * @package App\Console\Commands
 */
class InitProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:project';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrates and seeds database with initial values';
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->call('cache:clear');
        $this->call('config:clear');
        $this->call('route:clear');
        $this->call('view:clear');
        $this->call('migrate:fresh');
        $this->call('passport:install',['--force']);
        $this->call('php artisan passport:client',['--personal']);
        $this->call('key:generate');
        $this->call('storage:link');
        $this->call('migrate:fresh');
        $this->call('db:seed');
    }
}
