package dao.impl;

import java.util.List;
import java.util.Set;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import dao.IPaddockDAO;
import domain.Paddock;
import domain.PaddockId;

/**
 * A data access object (DAO) providing persistence and search support for
 * Paddock entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see domain.Paddock
 * @author MyEclipse Persistence Tools
 */

public class PaddockDAO extends HibernateDaoSupport implements IPaddockDAO {
	private static final Logger log = LoggerFactory.getLogger(PaddockDAO.class);
	// property constants
	public static final String _PNAME = "PName";
	public static final String _PCENTER_LAT = "PCenterLat";
	public static final String _PCENTER_LON = "PCenterLon";
	public static final String _PDESCRIPTION = "PDescription";
	public static final String _PFEED_CAPACITY = "PFeedCapacity";

	protected void initDao() {
		// do nothing
	}

	@Override
	public void save(Paddock transientInstance) {
		log.debug("saving Paddock instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	@Override
	public void delete(Paddock persistentInstance) {
		log.debug("deleting Paddock instance");
		try {
			Query query = this.getSession().createQuery("delete Paddock as p where p.id.PId = ? and p.id.farmFId = ?");
			query.setParameter(0, persistentInstance.getId().getPId());
			query.setParameter(1, persistentInstance.getId().getFarmFId());
			query.executeUpdate();
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public Paddock findById(domain.PaddockId id) {
		log.debug("getting Paddock instance with id: " + id);
		try {
			Paddock instance = (Paddock) getHibernateTemplate().get(
					"domain.Paddock", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	@Override
	public List findByExample(Paddock instance) {
		log.debug("finding Paddock instance by example");
		try {
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@Override
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Paddock instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Paddock as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	@Override
	public List findByPName(Object PName) {
		return findByProperty(_PNAME, PName);
	}

	@Override
	public List findByPCenterLat(Object PCenterLat) {
		return findByProperty(_PCENTER_LAT, PCenterLat);
	}

	@Override
	public List findByPCenterLon(Object PCenterLon) {
		return findByProperty(_PCENTER_LON, PCenterLon);
	}

	@Override
	public List findByPDescription(Object PDescription) {
		return findByProperty(_PDESCRIPTION, PDescription);
	}

	@Override
	public List findByPFeedCapacity(Object PFeedCapacity) {
		return findByProperty(_PFEED_CAPACITY, PFeedCapacity);
	}

	@Override
	public List findAll() {
		log.debug("finding all Paddock instances");
		try {
			String queryString = "from Paddock";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	@Override
	public Paddock merge(Paddock detachedInstance) {
		log.debug("merging Paddock instance");
		try {
			Paddock result = (Paddock) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(Paddock instance) {
		log.debug("attaching dirty Paddock instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(Paddock instance) {
		log.debug("attaching clean Paddock instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IPaddockDAO getFromApplicationContext(ApplicationContext ctx) {
		return (IPaddockDAO) ctx.getBean("PaddockDAO");
	}

	@Override
	public void updatePaddock(Paddock paddock) {
		this.getHibernateTemplate().update(paddock);		
	}
}