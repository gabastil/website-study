<?php
    include_once 'dbconnect.php';

    // Use to print the POST results to the screen
    // print_r($_POST);

    if (isset($_POST['user']) and isset($_POST['password'])){
        $user = $_POST['user'];
        $password = $_POST['password'];
        $database = $_POST['database'];

        $conn = mysqli_connect($host, $user, $password, $dbname);

        $results = mysqli_query($conn, "SELECT * FROM FirstTable");

        if ($results) {
            print_r($results);

            while ($row = mysqli_fetch_array($results)){
                print_r($row);
            }

        }
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

    <div id="log-in">
        <form action='index.php' method='post'>
            <section>
                <input type="text" name="user" placeholder='Username'>
                <input type="password" name="password" placeholder='Password'>
                <button type="submit" name='submit'>Log In</button>
            </section>
        </form>
    </div>

</body>
</html>