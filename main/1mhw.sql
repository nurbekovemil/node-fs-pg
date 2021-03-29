-- STEP 1. CREATE THE FOLLOWING TABLES

create table Worker (
	Worker_id serial primary key,
	First_name CHAR(25),
	Last_name CHAR(25),
	Salary INT,
	Joining_date Date,
	Department CHAR(25)
);

CREATE TABLE Bonus (
	Bonus_id INT,
	Bonus_amount INT,
	Bonus_date Date,
	FOREIGN KEY (Bonus_id) REFERENCES Worker(Worker_id) ON DELETE CASCADE
);

CREATE TABLE Title (
	Title_id INT,
	Worker_title CHAR(25),
	Affected_from Date,
	FOREIGN KEY (Title_id)
		REFERENCES Worker(Worker_id)
        ON DELETE CASCADE
);

-- STEP 2. FILL THE TABLE WITH THE TEST DATAS (EACH TABLE MUST HAVE 20 ENTRIES)

-- -- Have 20 ENTRIES
INSERT INTO Worker
		(First_name, Last_name, Salary, Joining_date, Department ) 
		values 
		('Annnora','McCartney', 25000 ,current_timestamp, 'Marketing');

-- -- Have 20 ENTRIES
INSERT INTO Bonus 
	(WORKER_REF_ID, BONUS_AMOUNT, BONUS_DATE) 
  VALUES
	(1, 5000, current_timestamp);

-- Have 20 ENTRIES
INSERT INTO Title 
	(Title_id, Worker_title, Affected_from) VALUES
	(1, 'Manager', current_timestamp);

-- STEP 3. COMPLETE 50 TASKS

-- 1 
  Select First_name as Worker_names from Worker;
-- 2
  Select upper(First_name) from Worker;
-- 3
  select distinct Department from Worker; --  исключает строки совпадающие по всем указанным выражениям
-- 4
  select substring(First_name,1,3) from Worker;
-- 5
  select position('G' IN 'Gettika') AS Worker;
-- 6
  select rtrim(First_name) from Worker; -- Удаления пробелов с правой стороны
-- 7
  select ltrim(First_name) from Worker; -- Удаления пробелов с левой стороны
-- 8
  select distinct length(Department) from Worker;
-- 9
  select REPLACE(FIRST_NAME,'a','A') from Worker;
-- 10
  select concat(First_name, ' ', Last_name) as Complete_name from Worker;
-- 11
  select * from Worker order by First_name asc;
-- 12
  select * from Worker order by First_name asc, Department desc;
-- 13
  select * from Worker where First_name in ('Cecil', 'Damien');
-- 14
  select * from Worker where First_name not in ('Cecil', 'Damien');
-- 15
  select * from Worker where Department like 'Admin%';
-- 16
  select * from Worker where First_name like '%a%';
-- 17
  select * from Worker where First_name like '%a';
-- 18
  select * from Worker where First_name like '_______h';
-- 19
  select * from Worker where Salary between 100000 and 500000;
-- 20
  select * from Worker where to_char(joining_date, 'mon') = 'mar'
-- 21
  select count(*) from Worker where Department = 'Admin'
-- 22
  select first_name, last_name, salary from Worker where salary between 50000 and 100000
-- 23
  select Department, count(Worker_id) Num_Of_workers FROM worker GROUP BY Department ORDER BY Num_of_workers DESC;
-- 24
  select distinct W.First_name, T.Worker_title from Worker W inner join Title T on W.Worker_id = T.Title_id and T.Worker_title in ('Manager')
-- 25
  select WORKER_TITLE, AFFECTED_FROM, COUNT(*) FROM Title GROUP BY WORKER_TITLE, AFFECTED_FROM HAVING COUNT(*) > 1;
-- 26
  select * from Worker where MOD(WORKER_ID, 2) <> 0; -- не четные строки
-- 27
  select * from Worker where MOD (WORKER_ID, 2) = 0; -- четные строки
-- 28
  select * into WorkerClone from Worker; --clone table
-- 29
  (select * from Worker) intersect (select * from WorkerClone);
-- 30
  select * FROM Worker MINUS select * FROM Title;
-- 31
  select current_date;
-- 32
  SELECT * FROM Worker ORDER BY Salary DESC LIMIT 10
-- 33
  SELECT Salary FROM Worker ORDER BY Salary DESC LIMIT 5;
-- 34
  SELECT Salary FROM Worker W1 WHERE 4 = (SELECT COUNT( DISTINCT ( W2.Salary ) )FROM Worker W2 WHERE W2.Salary >= W1.Salary);
-- 35
Select distinct W.WORKER_ID, W.FIRST_NAME, W.Salary from Worker W, Worker W1 where W.Salary = W1.Salary and W.WORKER_ID != W1.WORKER_ID;
-- 36
Select max(Salary) from Worker where Salary not in (Select max(Salary) from Worker);
-- 37
select FIRST_NAME, DEPARTMENT from worker W where W.DEPARTMENT='HR' 
union all 
select FIRST_NAME, DEPARTMENT from Worker W1 where W1.DEPARTMENT='HR';
-- 38
(SELECT * FROM Worker)
INTERSECT
(SELECT * FROM WorkerClone);
-- 39
SELECT * FROM WORKER WHERE WORKER_ID <= (SELECT count(WORKER_ID)/2 from Worker);
-- 40
SELECT DEPARTMENT, COUNT(WORKER_ID) as Number_of_Workers FROM Worker GROUP BY DEPARTMENT HAVING COUNT(WORKER_ID) < 5;
-- 41
SELECT DEPARTMENT, COUNT(DEPARTMENT) as Number_of_Workers FROM Worker GROUP BY DEPARTMENT;
-- 42
Select * from Worker where WORKER_ID = (SELECT max(WORKER_ID) from Worker);
-- 43
Select * from Worker where WORKER_ID = (SELECT min(WORKER_ID) from Worker);
-- 44
SELECT * FROM Worker WHERE WORKER_ID <=5 UNION SELECT * FROM (SELECT * FROM Worker W order by W.WORKER_ID DESC) AS W1 WHERE W1.WORKER_ID <=5;
-- 45
SELECT t.DEPARTMENT,t.FIRST_NAME,t.Salary from(SELECT max(Salary) as TotalSalary,DEPARTMENT from Worker group by DEPARTMENT) as TempNew  Inner Join Worker t on TempNew.DEPARTMENT=t.DEPARTMENT and TempNew.TotalSalary=t.Salary;
-- 46
SELECT distinct Salary from worker a WHERE 3 >= (SELECT count(distinct Salary) from worker b WHERE a.Salary <= b.Salary) order by a.Salary desc;
-- 47
SELECT distinct Salary from worker a WHERE 3 >= (SELECT count(distinct Salary) from worker b WHERE a.Salary >= b.Salary) order by a.Salary desc;
-- 48

-- 49

-- 50



