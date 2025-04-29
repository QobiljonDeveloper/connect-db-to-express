-- Active: 1745400910698@@127.0.0.1@3306@rent_stadium



CREATE DATABASE rent_stadium;

SHOW DATABASES

USE rent_stadium

SHOW TABLES

DROP TABLE users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer','admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);
CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(15,2) NOT NULL,
    `owner_id` INT NOT NULL
);

DROP TABLE booking

CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15,2) NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);
CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(15,2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL 
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` BIGINT  UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);



SHOW TABLES

SELECT * FROM users


INSERT INTO users (`role`, first_name, last_name, email, password, `phone`) VALUES
('owner', 'Ali', 'Karimov', 'ali.karimov@example.com', 'pass123Ali', '998901234567'),
('customer', 'Laylo', 'Yusupova', 'laylo.yusupova@example.com', 'pass456Lay', '998911234567'),
('admin', 'Jasur', 'Ismoilov', 'jasur.ismoilov@example.com', 'adminPass', '998931112233'),
('customer', 'Malika', 'Toshpulatova', 'malika.tosh@example.com', 'Malika2024!', '998901112233'),
('owner', 'Bobur', 'Rasulov', 'bobur.rasulov@example.com', 'Bobur@321', '998939876543'),
('admin', 'Dilnoza', 'Bekmurodova', 'dilnoza.bek@example.com', 'D!lnoza2024', '998998765432'),
('customer', 'Sardor', 'Nazarov', 'sardor.nazarov@example.com', 'sardor_456', '998977654321'),
('owner', 'Zilola', 'Shukurova', 'zilola.shukurova@example.com', 'zilolaPass1', '998901199887'),
('admin', 'Shahboz', 'Jalilov', 'shahboz.jalilov@example.com', 'shahbozPass', '998931100221'),
('customer', 'Nilufar', 'Soliyeva', 'nilufar.soliyeva@example.com', 'nilufar123', '998911100223');




INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status)
VALUES 
(1, 2, '2025-05-01', '10:00', '12:00', 200000.00, 'PENDING'),
(2, 3, '2025-05-02', '14:00', '16:00', 250000.00, 'CONFIRMED'),
(3, 4, '2025-05-03', '18:00', '20:00', 300000.00, 'PAID');



SELECT u.first_name, u.last_name, s.name, b.booking_date FROM booking b
LEFT JOIN stadium s  ON b.stadion_id = s.id
LEFT JOIN users u ON b.user_id = u.id
WHERE b.booking_date BETWEEN "205-01-01" AND "2025-06-01"



INSERT INTO review (stadion_id, user_id, rating, comment) VALUES
(1, 2, 5, 'Ajoyib stadion, toza va katta'),
(2, 3, 4, 'Yoritish sustroq edi, lekin umumiy yaxshi'),
(3, 4, 3, 'Maydon holati o‘rtacha'),
(1, 7, 5, 'Yaxshi jihozlangan, tavsiya qilaman'),
(2, 10, 2, 'Tozalikka e’tibor berish kerak');




SHOW TABLES

DROP PROCEDURE IF EXISTS getAllUsers

CREATE PROCEDURE IF NOT EXISTS getAllUsers()
BEGIN
    SELECT * FROM users;
END

CALL getAllUsers()



CREATE PROCEDURE IF NOT EXISTS getUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id=userId;
END


CALL getUserById(2)


CREATE PROCEDURE IF NOT EXISTS getUserName(IN userId INT, OUT userName VARCHAR(50))
BEGIN
    SELECT first_name INTO userName FROM users WHERE id = userId;
END



CALL getUserName(2, @userName) 


SELECT @userName


CREATE PROCEDURE IF NOT EXISTS res_out(INOUT res DECIMAL(15,2))
BEGIN
    SET res = res-10;
END

SET @res = 100

CALL res_out(@res)



SELECT @res 


CREATE PROCEDURE IF NOT EXISTS add_price(INOUT pri DECIMAL(15,2))
BEGIN
   SET pri = pri + pri;
END 


SET @pri = 112222223.00;
CALL add_price(@pri);   



UPDATE stadium
SET price = price + @pri;

SELECT * FROM stadium;


CREATE FUNCTION IF NOT EXISTS myFunc1() RETURNS INT DETERMINISTIC
BEGIN

    DECLARE sum INT DEFAULT 0;
    SELECT COUNT(*) into sum FROM stadium;
    return sum;
END


SELECT myFunc1()