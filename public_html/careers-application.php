<?php

    // Include PHPMailer
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';

    // Create instance
    $mail = new PHPMailer(true);

    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@nowararealty.com'; // your Google Workspace email
    $mail->Password   = 'rvqqxxxljklwoxva';      // the App Password from Google
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Database configuration
    $host = "localhost";
    $dbname = "u410691859_nowararealty";      // replace with your database name
    $username = "u410691859_nowara";    // replace with your database username
    $password = "Nowara@000";// replace with your database password

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    echo "php entered";
    // Check connection
    if ($conn->connect_error) {
        die("DB Connection failed: " . $conn->connect_error);
    }

    $full_name = $conn->real_escape_string($_POST['full_name']);
    $email     = $conn->real_escape_string($_POST['email']);
    $phone     = $conn->real_escape_string($_POST['phone']);
    $profile   = $conn->real_escape_string($_POST['profile']);
    echo "enterring values";


    // File upload
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] == 0) {
        $allowed_ext = ["pdf", "doc", "docx"];
        $file_name   = $_FILES['cv']['name'];
        $file_tmp    = $_FILES['cv']['tmp_name'];
        $file_ext    = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        if (in_array($file_ext, $allowed_ext)) {
            $new_filename = time() . "_" . basename($file_name);
            $upload_dir   = "uploads/";
            
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            $upload_path = $upload_dir . $new_filename;

            if (move_uploaded_file($file_tmp, $upload_path)) {
                $sql = "INSERT INTO careers_applications (full_name, email, phone, profile, cv_path) 
                        VALUES ('$full_name', '$email', '$phone', '$profile', '$upload_path')";

                if ($conn->query($sql) === TRUE) {
                    echo "success";
                    try{
                        // Email headers
                        $mail->setFrom('info@nowararealty.com', 'Nowara Realty Careers');
                        $mail->addAddress('hr@nowararealty.com', 'Nowara HR'); // where you want to receive alerts
        
                        // Email content
                        $mail->isHTML(true);
                        $mail->Subject = "New Job Application - " . $profile;
                        $mail->Body    = "
                            <h3>A new job application has been submitted</h3>
                            <p><b>Name:</b> $full_name</p>
                            <p><b>Email:</b> $email</p>
                            <p><b>Phone:</b> $phone</p>
                            <p><b>Profile:</b> $profile</p>
                            <p><b>CV File:</b> <a href='https://nowararealty.com/$upload_path'>Download CV</a></p>
                        ";
        
                        $mail->send();
                    }catch (Exception $e) {
                        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                    }

                } else {
                    echo "DB Error: " . $conn->error;
                }
            } else {
                echo "File upload failed!";
            }
        } else {
            echo "Invalid file type. Only PDF, DOC, DOCX allowed.";
        }
    } else {
        echo "Please upload a valid CV.";
    }

    $conn->close();
?>
