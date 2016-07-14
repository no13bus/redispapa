import threading
import redis
from redisstat import *
class Monitor(object):
    """Monitors a given Redis server using the MONITOR command.
    """

    def __init__(self, connection_pool):
        """Initializes the Monitor class.

        Args:
            connection_pool (redis.ConnectionPool): Connection pool for the \
                    Redis server to monitor.
        """
        self.connection_pool = connection_pool
        self.connection = None

    def __del__(self):
        try:
            self.reset()
        except:
            pass

    def reset(self):
        """If we have a connection, release it back to the connection pool.
        """
        if self.connection:
            self.connection_pool.release(self.connection)
            self.connection = None

    def monitor(self):
        """Kicks off the monitoring process and returns a generator to read the
        response stream.
        """
        if self.connection is None:
            self.connection = self.connection_pool.get_connection('monitor', None)
        self.connection.send_command("monitor")
        return self.listen()

    def parse_response(self):
        """Parses the most recent responses from the current connection.
        """
        return self.connection.read_response()

    def listen(self):
        """A generator which yields responses from the MONITOR command.
        """
        while True:
            yield self.parse_response()

class MonitorThread(threading.Thread):
    """Runs a thread to execute the MONITOR command against a given Redis server
    and store the resulting aggregated statistics in the configured stats
    provider.
    """

    def __init__(self, server, port, password=None):
        """Initializes a MontitorThread.

        Args:
            server (str): The host name or IP of the Redis server to monitor.
            port (int): The port to contact the Redis server on.

        Kwargs:
            password (str): The password to access the Redis host. Default: None
        """
        super(MonitorThread, self).__init__()
        self.server = server
        self.port = port
        self.password = password
        self.id = self.server + ":" + str(self.port)
        self._stop = threading.Event()
        self.counter = StatCounter()
        self.commands_processed = []
        self.pool = redis.ConnectionPool(host=self.server, port=self.port, db=0,
                                    password=self.password)

    def stop(self):
        """Stops the thread.
        """
        self._stop.set()

    def stopped(self):
        """Returns True if the thread is stopped, False otherwise.
        """
        return self._stop.is_set()

    def getResult(self):
        if len(self.commands_processed)> 10:
            self.counter.process_input(self.commands_processed)
            self.counter.print_stats()
            return self.counter.getResult()

    def run(self):
        """Runs the thread.
        """
        # stats_provider = RedisLiveDataProvider.get_provider()
        
        monitor = Monitor(self.pool)
        commands = monitor.monitor()

        
        for command in commands:
            #print "==============================\n"
            # print "current length\n"
            # print self.count_iterable(commands)
            # print datetime.datetime.now()
            #print command
            #print "==============================\n"
            self.commands_processed.append(command);

            if self.stopped():
                break
        
